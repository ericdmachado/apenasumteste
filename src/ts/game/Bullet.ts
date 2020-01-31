export default class Bullet{

	private width:number;
	private height:number;
	private active:boolean;
	private x:number;
	private y:number;
	private main:HTMLCanvasElement;
	
	constructor( m, x, y ){
		this.width 	= 10;
		this.height = 2;
		this.active = true;
		this.x = x;
		this.y = y;
		this.main = m;
	}

	draw(){
		//this.main.context.fillStyle = 'cyan';
		//this.main.context.fillRect(this.x, this.y, this.width, this.height);
	}

	inBounds(){
		//return this.x >= 0 && this.x <= this.main.getWidth();
	}

	update(){
		/* this.x += 15;
		this.active = this.active && this.inBounds(); */
	}
}