<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ranking extends GO_csrf_controller
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if($_SERVER['REQUEST_METHOD'] == 'POST')	
		{
			if($this->input->is_ajax_request() && $this->token_is_valid($this->input->post('csrftk')))
			{
				$this->save_score($this->input->post('kng'));
				exit;
			}
		}
		elseif($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			if($this->input->is_ajax_request())
			{
				$this->output
					->set_content_type('application/json')
					->set_output(json_encode(array(
					'users' 	=> $this->get_highscore(),
					'status'	=> TRUE
				)));
			}
		}
	}


	private function save_score($score)
	{
		if($score)
		{
			$result = $this->app_users->save_score($score);

			if($result)
			{
				$this->output
				     ->set_content_type('application/json')
				     ->set_output(json_encode(array(
						'message' 	=> $result,
						'status'	=> TRUE
					)));
			}
			else
			{
				$this->output
				     ->set_content_type('application/json')
				     ->set_output(json_encode(array(
						'message' 	=> 'Seu placar n&atilde;o pode ser salvo no momento.',
						'status'	=> FALSE
					)));
			}
		}
	}


	private function get_highscore()
	{
		return $this->app_users->get_highscore();
	}
}