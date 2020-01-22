<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class App_Users extends CI_Model 
{
	public function __construct()
	{
		parent::__construct();
	}


	public function create($data=NULL) //insert
	{
		if($data)
		{
			if(!$this->check_user_exist($data['user']))
			{
				$id = $this->generate_id($data['user']);
			
				$nuser = array(
				   'user_id' 	=> $id,
				   'user_mail' 	=> $this->security->xss_clean(strip_tags(strtolower($data['user']))),
				   'user_pass' 	=> $this->generate_pass($id, $data['pass']),
				   'user_image' 	=> '',
				   'user_created'=> NULL,
				   'user_actived'=> 1
				);


				if($result = $this->db->insert('__game_users', $nuser))
				{
					return $this->put_user_on_session($nuser['user_id'], $nuser['user_mail']);
				}
				else
				{
					return json_encode(array(
						'status' 	=> 'error',
						'message' 	=> 'Vishh... Deu um probleminha aqui e n&atilde;o deu pra cadastrar voc&ecirc;. Vamos tentar novamente?'
					));
				}
			}
			else
			{
				return json_encode(array(
						'status' 	=> 'error',
						'message' 	=> 'Ei... Este e-mail j&aacute; est&aacute; participando do Chat. Tenta outro.'
					));
			}
		}
	}

	public function read($mail, $pass) //select
	{
		$pass = $this->generate_pass($this->generate_id(strtolower($mail)), $pass);

		$this->db->select('user_id, user_mail, user_image');
		$this->db->where('user_mail', $this->security->xss_clean(strip_tags(strtolower($mail))));
		$this->db->where('user_pass', $pass);
		$this->db->where('user_actived', '1');

		$nuser = $this->db->get('__game_users')->first_row();

		if(!$nuser)
		{
			return json_encode(array(
					'status' 	=> 'error',
					'message' 	=> 'Humm... n&atilde;o deu certo. Vamos tentar novamente?'
				));
		}
		else
		{
			return $this->put_user_on_session($nuser->user_id, $nuser->user_mail);
		}
	}

	public function update() //update
	{
		echo 'update';
	}

	public function delete() //destroy
	{
		echo 'delete';
	}


	private function check_user_exist($mail)
	{
		$this->db->where('user_mail', $this->security->xss_clean(strip_tags($mail)));
		$this->db->where('user_actived', 1);



		if($this->db->get('__game_users')->first_row())
		{
			return TRUE;
		}
		else
		{
			return FALSE;
		}
	}

	private function put_user_on_session($id, $mail)
	{
		$logged = array(
				'userlogged' 	=> TRUE,
				'user_id'	=> $id,
				'user_mail'	=> $mail
			);
		
		$this->session->set_userdata( $logged );

		unset($data);
		unset($nuser);

		return json_encode(array(
				'status' 	=> 'success',
				'message' 	=> ''
			));
	}


	private function generate_pass($id, $pass)
	{
		return hash_hmac('sha256', 'UserPass_'. $id .'_'. $this->security->xss_clean(strip_tags($pass)), CHAT_KEY_SECRET);
	}

	private function generate_id($id)
	{
		return md5('UserLogin_'. $this->security->xss_clean(strip_tags($id)));
	}


	public function save_score($score)
	{
		//__game_highscore
		$score = $this->get_score($score);


		if($score)
		{
			$hscore = array(
			   'score_id' 		=> NULL,
			   'score_user_id' 	=> $this->session->userdata('user_id'),
			   'score_value' 	=> $score,
			   'score_locate' 	=> 'pt-br',
			   'score_record' 	=> NULL,
			   'score_actived'	=> 1
			);

			$this->db->insert('__game_highscore', $hscore);
		}
	}


	public function get_score($score)
	{
		$a = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');

		$score = explode('%dx%', $score);
		$s = array();

        for($i=0;$i<count($score);$i++)
        {
        	$ss = array();

        	for($j=0;$j<strlen($score[$i]);$j++)
        	{
        		$cc = str_split($score[$i]);
        		
        		for ($k = 0; $k < count($a); $k++) 
        		{
        			if($cc[$j] == $a[$k])
        			{
        				array_push($ss, $k);
        			}
        		}
        	}

        	$ss = join('', $ss);
        	$ss = $ss == '' ? '0' : floor($this->get_rand() / $ss);

        	array_push($s, $ss);
        }


        return join('', $s);
	}

	public function get_rand()
	{
		$somaip = explode('.', $this->input->ip_address().'.'.date('d.m.Y'));
		return array_sum($somaip);
	}


	public function get_highscore()
	{
		$this->db->select('score_user_id, score_value, score_locate, score_record, score_actived');
		$this->db->order_by('score_value', 'DESC');
		$result = $this->db->get('__game_highscore', 10)->result();
		
		foreach ($result as $indice => $score)
		{
			$this->db->select('user_mail, user_image');
			$this->db->where('user_id', $score->score_user_id);
			$this->db->where('user_actived', '1');
			$ruser = $this->db->get('__game_users')->first_row();
			
			$result[$indice]->{'score_user_mail'} = substr($ruser->user_mail, 0, strpos($ruser->user_mail, '@'));
			$result[$indice]->{'score_user_image'} = $ruser->user_image;

			unset($result[$indice]->{'score_user_id'});
		}

		return $result;
	}




	public function get_users()
	{
		$this->db->select('user_mail');
		$this->db->where('user_actived', '1');
		
		return $this->db->get('__game_users')->result();
	}


	public function get_session()
	{
		$this->db->select('user_agent, user_data');
		return $this->db->get('__game_session')->result();
	}
}