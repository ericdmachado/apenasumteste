export default class SpaceShip{
	private pos:any;
	private angle:number;
	private vel:any;
	private targetVel:any;  
	private temp:any;
	private main:any;
	private counter:number;
	private shiphalf:any;
	private half:any;
	private canvas:HTMLCanvasElement;
	private context:CanvasRenderingContext2D;
	private bullets:any;
	private state:any;

	constructor(){
		this.angle = 0;
		this.counter = 0;
		this.shiphalf = 0;
		this.canvas = <HTMLCanvasElement>document.createElement('canvas');
		this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
		/* this.pos = new Vector2(0,0);
		this.angle = 0;
		this.vel = new Vector2(0,0);
		this.targetVel = new Vector2(0,0);
		this.temp = new Vector2(0,0);
		this.main;
		this.bullets = [];
		this.counter = 0;
		this.canvas.width = 40;
		this.canvas.height = 40;
		this.canvas.id="spaceship"; */

		/* this.shiphalf = {
			width: canvas.width / 2,
			height: canvas.height / 2
		};

		this.half = {
			width: (document.documentElement.clientWidth/2) - shiphalf.width,
			height: (document.documentElement.clientHeight/2) - shiphalf.height
		}; */

		this.state = {
			players: []
		}
	}
	
	loadSpaceship(){
		/* var t = this;
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
          	imageObj.src = 'assets/img/gameui/spaceship.png'; */
	};

	move( command:any ){
		console.info(`Moving ${command.playerId} with command ${command.keyPressed}`);

		const acceptedMoves = {
			ArrowUp(player){
				console.info('Moving player Up');
			},
			ArrowDown(player){
				console.info('Moving player ArrowDown');
			},
			ArrowLeft(player){
				console.info('Moving player Left');
			},
			ArrowRight(player){
				console.info('Moving player Right');
			}
		};

		const keyPressed = command.keyPressed;
		const player = this.state.players[command.playerId];


		console.info( keyPressed, player );


		/* canvas.setAttribute('class', 'actived');

		if(canvas.getAttribute('data-status') == 'actived')
		{
			//var styleStr = "translate3d("+(half.width)+"px, "+ (half.height)+"px, 0px) rotate("+ this.angle +"deg)"; 
			var styleStr = "translate3d("+(130)+"px, "+ (pos.y)+"px, 0px) rotate("+ this.angle +"deg)";

			canvas.style.webkitTransform = canvas.style.MozTransform = canvas.style.OTransform = canvas.style.transform = styleStr; 
		} */
	}

	
	draw(){
		/* this.bullets.forEach(function(bullet){
			bullet.update();
			bullet.draw();
		});

		this.bullets = this.bullets.filter(function(bullet) {
			return bullet.active;
		}); */
	}

	update() {
		/* //speed limit
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
		//thrustSize = vel.magnitude();  */
	};


	fire(){
		/* createjs.Sound.play("shot");
		this.bullets.push(new Bullet(this.main, 155, this.pos.y + 29)); */
	}

	setPixelRatio(){
		/* var devicePixelRatio = window.devicePixelRatio || 1;
	    var backingStoreRatio = context.webkitBackingStorePixelRatio ||
	                        context.mozBackingStorePixelRatio ||
	                        context.msBackingStorePixelRatio ||
	                        context.oBackingStorePixelRatio ||
	                        context.backingStorePixelRatio || 1;

	    if(devicePixelRatio === 1) devicePixelRatio = 1;

	    var ratio = devicePixelRatio / backingStoreRatio;


	    if (devicePixelRatio !== backingStoreRatio) 
	    {
	        var oldWidth = canvas.width;
	        var oldHeight = canvas.height;

	        canvas.width = oldWidth * ratio;
	        canvas.height = oldHeight * ratio;

	        canvas.style.width = oldWidth + 'px';
	        canvas.style.height = oldHeight + 'px';

	        context.scale(ratio, ratio);
	    } */
	}
}