var SpaceShip = function()
{
	var pos = this.pos = new Vector2(0,0);
	var angle = this.angle = 0;

	var vel = this.vel = new Vector2(0,0);

	var targetVel = this.targetVel = new Vector2(0,0);  
	var temp = new Vector2(0,0); 

	var canvas = this.canvas = document.createElement('canvas');

		canvas.width = 40;
		canvas.height = 40;


	var main = this.main;


	var counter = 0;

	var shiphalf = {
			width: canvas.width / 2,
			height: canvas.height / 2
		}

	var half = {
		width: (document.documentElement.clientWidth/2) - shiphalf.width,
		height: (document.documentElement.clientHeight/2) - shiphalf.height
	}

		canvas.id="spaceship";

	var context = canvas.getContext('2d');
		this.context = context;


	this.loadSpaceship = (function()
	{
		var t = this;
		var imageObj = new Image();
        	imageObj.onload = function() 
        	{
          		context.drawImage(this, 0, 0, imageObj.width, imageObj.height, 0, 0, 40, 30);

          		//with(t.pos)
		        // {
		        //     x =  0;
		        //     y =  (document.documentElement.clientHeight/2) - 20;
		        // }
          	}
          	imageObj.src = 'assets/img/gameui/spaceship.png';
	})();


	var bullets = this.bullets = [];

	


	this.move = function(x, y)
	{
		//console.log('movin on');
		canvas.setAttribute('class', 'actived');

		if(canvas.getAttribute('data-status') == 'actived')
		{
			//var styleStr = "translate3d("+(half.width)+"px, "+ (half.height)+"px, 0px) rotate("+ this.angle +"deg)"; 
			var styleStr = "translate3d("+(130)+"px, "+ (pos.y)+"px, 0px) rotate("+ this.angle +"deg)";

			canvas.style.webkitTransform = canvas.style.MozTransform = canvas.style.OTransform = canvas.style.transform = styleStr; 
		}
	}

	
	this.draw = function()
	{
		/*context.clearRect(0,0,canvas.width,canvas.height);

		context.fillStyle = "rgba(255,255,255,0.5)";
		//context.fillRect(0,0,60,60); 
		context.save();
		context.translate(20, 20);

		context.strokeStyle = "#fff"; 
		context.lineWidth = 1; 
		
		context.beginPath();
		context.moveTo(-5, -5);
		context.lineTo(-5, 5);
		context.lineTo(7, 0);
		context.closePath(); 
		context.stroke();

		context.restore();*/

		this.bullets.forEach(function(bullet){
			bullet.update();
			bullet.draw();
		});

		this.bullets = this.bullets.filter(function(bullet) {
			return bullet.active;
		});
	}

	this.update = function() {
		//speed limit
		var maxSpeed = 6;
		if(targetVel.isMagGreaterThan(maxSpeed))
		{
			targetVel.normalise(); 
			targetVel.multiplyEq(maxSpeed); 
			
		}
		if(!targetVel.equals(vel))
		{
			
			temp.copyFrom(targetVel); 
			temp.minusEq(vel); 

			if(temp.isMagGreaterThan(0.0001))  temp.multiplyEq(1);//0.3 
			
			vel.plusEq(temp); 
			
		} 
		pos.plusEq(vel);
		
		if(vel.isMagGreaterThan(0)) this.angle = 0;//this.angle = vel.angle();

		this.move(pos.x, pos.y);
		 
		//if(thrustSize>0) thrustSize--; 
		//thrustSize = vel.magnitude(); 
	};


	this.fire = function()
	{
		createjs.Sound.play("shot");
		this.bullets.push(new Bullet(this.main, 155, this.pos.y + 29));
	}

	this.setPixelRatio = (function()
	{
	    devicePixelRatio = window.devicePixelRatio || 1;
	    backingStoreRatio = context.webkitBackingStorePixelRatio ||
	                        context.mozBackingStorePixelRatio ||
	                        context.msBackingStorePixelRatio ||
	                        context.oBackingStorePixelRatio ||
	                        context.backingStorePixelRatio || 1;

	    if(devicePixelRatio === 1) devicePixelRatio = 1;

	    ratio = devicePixelRatio / backingStoreRatio;


	    if (devicePixelRatio !== backingStoreRatio) 
	    {
	        var oldWidth = canvas.width;
	        var oldHeight = canvas.height;

	        canvas.width = oldWidth * ratio;
	        canvas.height = oldHeight * ratio;

	        canvas.style.width = oldWidth + 'px';
	        canvas.style.height = oldHeight + 'px';

	        context.scale(ratio, ratio);
	    }
	})();
}