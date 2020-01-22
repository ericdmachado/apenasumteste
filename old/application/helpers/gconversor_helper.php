<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/*
 |--------------------------------------------------------------------------
| URL FRIENDLY
|--------------------------------------------------------------------------
|
|
|
*/
if ( ! function_exists('url_friendly'))
{
    function url_friendly($str, $slug='-')
	{
		$str = utf8_decode(strtolower($str));
		$str = strtr($str, utf8_decode('àáâãäåæçèéêëìíîïñòóôõöøùúûýýÿ³²¹'), 'aaaaaaaceeeeiiiinoooooouuuyyy321');
		$str = strtr($str, utf8_decode('ÀÁÂÃÄÅÆçÈÉÊËÌÍÎÏÑÒÓÔÕÖøÙÚÛÝ'), strtoupper('aaaaaaaceeeeiiiinoooooouuuy'));
		$str = strtr($str, utf8_decode('´`^~¬¨£¢'), '        ');
		$str = preg_replace("/[[:punct:]]/i",' ', utf8_encode($str));
		$str = preg_replace("/[[:space:]]/", $slug, $str);
		$str = preg_replace("/-{2,30}/", $slug, $str);
		$str = preg_replace("/_{2,30}/", $slug, $str);
		$str = preg_replace("/(\_)+?$/", '', $str);
		$str = preg_replace("/(\-)+?$/", '', $str);
		$str = preg_replace("/\(\)\{\}\<\>\|\\\/", '', $str);
		$str = preg_replace("/[[:cntrl:]]]/", '', $str);

		return strtolower($str);
	}
}

/*
 |--------------------------------------------------------------------------
| FILENAME FRIENDLY
|--------------------------------------------------------------------------
|
|
|
*/
if ( ! function_exists('filename_friendly'))
{	
	function filename_friendly($filename)
	{
		return url_friendly($filename, '_');
	}   
}


/*
 |--------------------------------------------------------------------------
| PATHNAME FRIENDLY
|--------------------------------------------------------------------------
|
|
|
*/
if ( ! function_exists('pathname_friendly'))
{	
	function pathname_friendly($pathname)
	{
		$path = preg_replace("/(http|https)/", '', filename_friendly($pathname));
		$path = preg_replace("/(w{1,3})/", '', $path);
		$path = preg_replace("/(_{1}$)/", '', $path);
		$path = preg_replace("/^_{1,5}/", '', $path);
		return $path;
	}   
}



/*
 |--------------------------------------------------------------------------
| PRINT PRE
|--------------------------------------------------------------------------
|
|
|
*/
if ( ! function_exists('pre'))
{	
	function pre($info, $exit = TRUE)
	{
		print '<pre>';
		print_r($info);
		print '</pre>';

		if($exit) exit;
	}   
}



/*
 |--------------------------------------------------------------------------
| PREG_REPLACE_CALLBCK FOR < PHP 4.0.5
|--------------------------------------------------------------------------
|
|
|
*/
if(!function_exists('preg_replace_callback'))
{
	function preg_replace_callback($pattern, $callback, $subject)
	{
		$str = preg_replace($pattern, $callback(null), $subject);
		return $str;
	}
}