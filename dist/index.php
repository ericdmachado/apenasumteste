<?php
require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
require 'jsondb/jsondb.php';

$app = new Silex\Application();



function get_rand($request)
{
	$somaip = explode('.', $request->getClientIp() .'.'.date('d.m.Y'));
	return array_sum($somaip);
}

function template_parser($file, $data){
	$template = file_get_contents($file);

	foreach ($data as $key => $value) {
		$template = preg_replace('/\{'.$key.'\}/', $value, $template);
	}

	return $template;
};

function get_token(){
	if(isset($_COOKIE['__eaut'])){
		return $_COOKIE['__eaut'];
	}else{
		$id = md5(uniqid(rand(), true));
		setcookie('__eaut', $id);
		return $id;
	}
};

function get_score($score, $request){
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
    	$ss = $ss == '' ? '0' : floor(get_rand($request) / $ss);

    	array_push($s, $ss);
    }


    return join('', $s);
}

$jsondb = new JsonDB(array('dbname'=>'database', 'path'=>realpath('database')));



$app->get('/', function (Request $request) use ($app, $jsondb) {
	$data = array(
		'CSRF_TOKEN' => get_token(),
		'RAND' => get_rand($request)
	);

	$template = template_parser('views/home.php',  $data);

	return $template;
});



$app->post('/ranking', function (Request $request) use ($app, $jsondb){
	$score = get_score($request->get('kng'), $request);
	$token = get_token();
	$user = $jsondb->users->find(array('userid'=>$user))->data;

	if(count($user)){
		$user->score = $score;

		$jsondb->users->update(array('userid'=>$user), $user);
	}else{
		$jsondb->users->insert(array(
			'userid' => $user,
			'score' => $score
		));
	}

	return $app->json(array(
    	'status' => true
    ), 200);
});

$app->get('/ranking', function () use ($app, $jsondb) {
	
	return $app->json(array(
    	'users' => $jsondb->users->find(array('score'=>'*'), array('score'=>true))->data,
    	'status' => true
    ), 200);
});

$app->run();