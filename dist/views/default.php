<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8' />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">

		<title>{PAGE_TITLE} - É Apenas Um Teste</title>
		<link rel="stylesheet" href="{BASE_URL}assets/css/chat.css" type="text/css">
	</head>
	<body class="ui-page ui-page-{PAGE_CLASS}" {if {PAGE_CLASS} == 'home'}onmousedown="return false;"{/if}>
		<header id="header" class="">
			{PAGE_TITLE_EXTENDED}
		</header>

		{CHAT_CONTENT}
		<div id="developer"></div>
	</body>
</html>