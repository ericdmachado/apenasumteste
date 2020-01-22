<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8' />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<title>É Apenas Um Teste</title>
		<link rel="stylesheet" href="{BASE_URL}assets/css/chat.css" type="text/css">
	</head>
	<body class="ui-page ui-page-{PAGE_CLASS}" {if {PAGE_CLASS} == 'home'}onmousedown="return false;"{/if}>
		<link rel="stylesheet" href="assets/css/astedroid.css">
		<div class="py" data-py="{RAND}"></div>
		<script id="game-tmpl" type="text/html">
			<div id="init" class="ui-layer">
				<div class="wrapper">
					<h2><span>&Eacute; apenas</span>Um teste</h2>
					<div>
						<button class="ui-btn ui-btn-default large" id="btn-init">Iniciar</button>
						<button class="ui-btn ui-btn-default large" id="btn-placar">Ranking</button>
					</div>
				</div>
			</div>

			<div id="gameover" class="ui-layer">
				<div class="wrapper">
					<h2>Game Over</h2>
					<span id="ponto-placar-final"></span>
					<div>
						<button class="ui-btn ui-btn-default large" id="btn-reinit">Reiniciar</button>
						<button class="ui-btn ui-btn-default large" id="btn-placar-2">Ranking</button>
					</div>
				</div>
			</div>

			<div id="game-score"><span class="score">0</span><span class="add"></span></div>
			<div class="game-life">
				<div class="bar-ship-energy"><span></span></div>
				<div class="lifes">
					<i class="ui-icon icon-heart"></i>
					<i class="ui-icon icon-heart"></i>
					<i class="ui-icon icon-heart"></i>
				</div>
			</div>
			<canvas id="the-responsive-game"></canvas>
		</script>
		<input type="hidden" name="csrftk" id="csrftk" value="{CSRF_TOKEN}">

		<section id="game-container"></section>

		<section id="highscore">
			<h3>Os 10 melhores est&atilde;o  aqui<button class="ui-btn ui-btn-close ui-btn-danger inverse" id="score-close"><i class="ui-icon icon-remove"></i></button></h3>
			<div class="ui-wrapper-top-10">
				<ul class="top10"></ul>
			</div>
		</section>

		<script type="text/javascript">
			var base_url = baseurl = BASE_URL = BASEURL = '/';
		</script>
		<script type="text/javascript" src="assets/js/lib/jquery.min.js"></script>
		<script type="text/javascript" src="assets/js/lib/jquery.transit-0.9.9.min.js"></script>
		<script type="text/javascript" src="assets/js/lib/soundjs.min.js"></script>
		<script type="text/javascript" src="assets/js/lib/stats.min.js"></script>
		<script type="text/javascript" src="assets/js/lib/Vector2.js"></script>
		<script type="text/javascript" src="assets/js/lib/pointer.min.js"></script>
		<script type="text/javascript" src="assets/js/lib/modernizr-2.7.1-min.js"></script>
		<script type="text/javascript" src="assets/js/game/score.js"></script>
		<script type="text/javascript" src="assets/js/game/spaceship.js"></script>
		<script type="text/javascript" src="assets/js/game/asteroid.js"></script>
		<script type="text/javascript" src="assets/js/game/bullet.js"></script>
		<script type="text/javascript" src="assets/js/game/starfield.js"></script>
		<script type="text/javascript" src="assets/js/game/gameteste.js"></script>
		<script type="text/javascript" src="assets/js/main.js"></script>
	</body>
</html>