<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cadastro extends GO_csrf_controller
{
	public function __construct()
	{
		parent::__construct();

		if($this->session->userdata('userlogged')) header('Location: '. base_url());
	}

	public function index($error=NULL)
	{
		if($this->input->post('email') && $this->input->post('senha') && !$error) //ENVIOU OS DADOS DO FORM? // CADASTRO NOVO?
		{
			$this->cadastra();
		}
		elseif($error)
		{
			$page = $this->template_parser->parse('cadastro', array('CSRF_TOKEN' 	=> $this->CSRF_TOKEN), TRUE);
			$this->template_parser->parse('default', array(
					'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
					'PAGE_MODAL'	=> $error,
					'PAGE_TITLE' 	=> ucfirst(get_class()),
					'PAGE_CLASS' 	=> strtolower(get_class()),
					'CHAT_CONTENT' 	=> $page
				));
		}
		else //EXIBE O FORM PARA CADASTRO
		{
			$page = $this->template_parser->parse('cadastro', array('CSRF_TOKEN' 	=> $this->CSRF_TOKEN), TRUE);
			$this->template_parser->parse('default', array(
					'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
					'PAGE_TITLE' 	=> ucfirst(get_class()),
					'PAGE_CLASS' 	=> strtolower(get_class()),
					'CHAT_CONTENT' 	=> $page
				));
		}
	}


	public function convide()
	{
		$page = $this->template_parser->parse('convidar', array('CSRF_TOKEN' 	=> $this->CSRF_TOKEN), TRUE);

		$this->template_parser->parse('default', array(
				'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
				'PAGE_TITLE' 	=> ucfirst(__FUNCTION__),
				'PAGE_CLASS' 	=> strtolower(__FUNCTION__),
				'CHAT_CONTENT' 	=> $page
			));
	}


	private function cadastra()
	{
		$result = json_decode($this->app_users->create(array(
				'user' => $this->input->post('email'),
				'pass' => $this->input->post('senha')
			)));

		if($result->status == 'success')
		{
			header('Location: '. base_url());
		}
		else
		{
			$this->index($result);
		}
	}
}