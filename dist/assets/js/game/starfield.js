var Starfield = function()
{
	/*var stars = document.getElementById('the-responsive-game');
		stars.style.backgroundPosition = -(pos.x) +'px 0px';

	var starsParallax = document.getElementById('stars-parallax');
		starsParallax.style.backgroundPosition = -(pos.x * 0.5) +'px 0px';*/


	var spriteStars = ['assets/img/gameui/bkg-stars-max.png', 'assets/img/gameui/bkg-stars-mid.png', 'assets/img/gameui/bkg-stars-min.png'];

	var starMinCanvas = this.starMinCanvas = document.createElement('canvas');
	var starMaxCanvas = this.starMaxCanvas = document.createElement('canvas');
	var starMidCanvas = this.starMidCanvas = document.createElement('canvas');

		starMinCanvas.width = starMidCanvas.width = starMaxCanvas.width = document.documentElement.clientWidth;
		starMinCanvas.height = starMidCanvas.width = starMaxCanvas.height = document.documentElement.clientHeight;

		starMinCanvas.id = 'starMinCanvas';
		starMaxCanvas.id = 'starMaxCanvas';
		starMidCanvas.id = 'starMidCanvas';

	var starMinContext = starMinCanvas.getContext('2d');
	var starMaxContext = starMaxCanvas.getContext('2d');
	var starMidContext = starMidCanvas.getContext('2d');

		this.starMinContext = starMinContext;
		this.starMaxContext = starMaxContext;
		this.starMidContext = starMidContext;


	var spriteMin;
	var spriteMid;
	var spriteMax;

	var posXX = 0;
	var posXN = 0;
	var posXM = 0;


	this.move = function(c, x, y)
	{
		var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;

        posXX+=6.5;
        posXN+=0.2;
        posXM+=0.5;

        if(posXX>w) posXX = 0;
        if(posXN>w) posXN = 0;
        if(posXM>w) posXM = 0;

		//starMaxContext.clearRect(0, 0, w, h);
		//starMinContext.clearRect(0, 0, w, h);
		//c.clearRect(0,0,w,h);

		c.drawImage(starMidCanvas, -posXM, 0);
		c.drawImage(starMidCanvas, w-posXM, 0);

		c.drawImage(starMinCanvas, -posXN, 0);
		c.drawImage(starMinCanvas, w-posXN, 0);

		c.drawImage(starMaxCanvas, -posXX, 0);
		c.drawImage(starMaxCanvas, w-posXX, 0);
	}

	this.init = function()
	{
		this.resize();
	}

	this.resize = function()
	{
		var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;

	        starMinCanvas.width 	= starMidCanvas.width 	= starMaxCanvas.width 	= w;
			starMinCanvas.height 	= starMidCanvas.height 	= starMaxCanvas.height 	= h;

		if(spriteMax)
		{
			starMaxContext.fillStyle = starMaxContext.createPattern(spriteMax, 'repeat');
			starMaxContext.fillRect(0, 0, w, h);

			starMidContext.fillStyle = starMidContext.createPattern(spriteMid, 'repeat');
			starMidContext.fillRect(0, 0, w, h);

			starMinContext.fillStyle = starMinContext.createPattern(spriteMin, 'repeat');
			starMinContext.fillRect(0, 0, w, h);
		}
	}


	this.loadStarfield = function()
	{
		var t = this;

		for(var i = 0; i < spriteStars.length; i++)
		{
			var imageObj = new Image();
        	imageObj.onload = function() 
        	{
          		spriteStars.pop();

          		if(String(this.src).toString().indexOf('max') > -1)
          		{
          			spriteMax = this;
          		}
          		else if(String(this.src).toString().indexOf('mid') > -1)
          		{
          			spriteMid = this;
          		}
          		else
          		{
          			spriteMin = this;
          		}

          		if(spriteStars.length === 0) t.init();
          	}
          	imageObj.src = spriteStars[i];
		}
	}

	this.loadStarfield();
}