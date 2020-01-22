<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Go_Csrf_controller extends CI_Controller 
{
	public $CSRF_TOKEN;

	public function __construct()
	{	
		parent::__construct();	

		header("Server: Apache");
		header("X-Powered-By: EDM");

		$this->CSRF_TOKEN = $this->get_token();
	}



	public function get_token()
	{
		$k = $this->session->userdata('session_id') .':'. md5($_SERVER['HTTP_USER_AGENT']) .':'. $this->input->ip_address();
		return base64_encode($this->encrypt->encode($k, CHAT_KEY_SECRET));
	}



	public function token_is_valid($token)
	{
		$k = base64_decode($this->security->xss_clean(strip_tags($token)));
		$tk = explode(':', $this->encrypt->decode($k, CHAT_KEY_SECRET));

		if($tk[0] == $this->session->userdata('session_id'))
		{
			if($tk[1] == md5($_SERVER['HTTP_USER_AGENT']))
			{
				if($tk[2] == $this->input->ip_address())
				{
					return TRUE;
				}
				return FALSE;
			}
			return FALSE;
		}
		return FALSE;
	}
}