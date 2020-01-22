<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require 'Go_Csrf_controller.php';

class Go_Controller extends Go_Csrf_controller 
{
	public function __construct()
	{	
		parent::__construct();	
	
		if(!$this->session->userdata('userlogged')) header('Location: '. base_url() .'login');
	}
}