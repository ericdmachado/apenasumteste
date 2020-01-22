var Asteroid = function(m,x,y)
{
	this.sprite 	= m.spriteAsteroid;	
	this.active 	= true;
	this.x 			= x;
	this.y 			= y;
	this.scale 		= Math.round( Math.random() * 120 );
	this.scale 		= this.scale < 30 ? this.scale = 30 : this.scale;
	this.angle 		= 30;
	this.speed 		= Math.max(2, Math.random() * 8);
	this.c 			= m.context;
	this.main 		= m;

	
	this.draw = function()
	{
		this.c.drawImage(this.sprite, this.x, this.y, this.scale, this.scale);
	}

	this.update = function()
	{
		this.x -= this.speed;
		this.active = this.active && this.inBounds();
	}

	this.inBounds = function()
	{
		return this.x >= -120 && this.x <= this.main.getWidth();
	}

	this.resize = function()
	{
		
	}

	return this;
}