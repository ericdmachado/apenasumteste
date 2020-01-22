<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends go_controller
{

	public function index()
	{
		$page = $this->template_parser->parse('home', array('CSRF_TOKEN' => $this->CSRF_TOKEN, 'RAND' => $this->app_users->get_rand()), TRUE);

		$this->template_parser->parse('default', array(
				'CSRF_TOKEN' 	=> $this->CSRF_TOKEN,
				'PAGE_TITLE' 	=> ucfirst(get_class()),
				'PAGE_CLASS' 	=> strtolower(get_class()),
				'CHAT_CONTENT' 	=> $page
			));
	}
}