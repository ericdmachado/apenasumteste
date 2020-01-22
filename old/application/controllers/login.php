<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends GO_csrf_controller
{
	public function __construct()
	{
		parent::__construct();

		if($this->session->userdata('userlogged')) header('Location: '. base_url());
	}

	public function index()
	{
		if($this->input->post('email') && $this->input->post('senha'))
		{
			$result = json_decode($this->valid_login());


			pre($result);

			if($result->status == 'success')
			{
				header('Location: '. base_url());
			}
			else
			{
				$login = $this->template_parser->parse('login', array('CSRF_TOKEN' 	=> $this->CSRF_TOKEN), TRUE);

				$this->template_parser->parse('default', array(
						'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
						'PAGE_MODAL'	=> $result,
						'PAGE_TITLE' 	=> ucfirst(get_class()),
						'PAGE_CLASS' 	=> strtolower(get_class()),
						'CHAT_CONTENT' 	=> $login
					));
			}
		}
		else
		{
			$login = $this->template_parser->parse('login', array('CSRF_TOKEN' 	=> $this->CSRF_TOKEN), TRUE);

			$this->template_parser->parse('default', array(
					'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
					'PAGE_TITLE' 	=> ucfirst(get_class()),
					'PAGE_CLASS' 	=> strtolower(get_class()),
					'CHAT_CONTENT' 	=> $login
				));
		}
	}


	public function logoff()
	{
		$this->session->sess_destroy();

		header('Location: '. base_url() .'login');
	}


	public function esqueci()
	{
		$login = $this->template_parser->parse('esqueci', array('CSRF_TOKEN' 	=> $this->CSRF_TOKEN), TRUE);

		$this->template_parser->parse('default', array(
				'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
				'PAGE_TITLE' 	=> ucfirst(__FUNCTION__),
				'PAGE_CLASS' 	=> strtolower(__FUNCTION__),
				'CHAT_CONTENT' 	=> $login
			));
	}


	private function valid_login()
	{
		$result = json_decode($this->app_users->read(
				$this->security->xss_clean(strip_tags($this->input->post('email'))), 
				$this->security->xss_clean(strip_tags($this->input->post('senha')))
			));

		if($result->status == 'success')
		{
			header('Location: '. base_url());
		}
		else
		{
			pre($result);
		}
	}
}