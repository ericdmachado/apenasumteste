<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset='UTF-8' />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="no">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>Error</title>
	</head>
	<body>
		<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">

		<h4>A PHP Error was encountered</h4>

		<p>Severity: <?php echo $severity; ?></p>
		<p>Message:  <?php echo $message; ?></p>
		<p>Filename: <?php echo $filepath; ?></p>
		<p>Line Number: <?php echo $line; ?></p>

		</div>
	</body>
</html>