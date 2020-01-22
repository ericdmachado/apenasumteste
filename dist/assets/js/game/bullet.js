var Bullet = function(m, x, y)
{
	this.width 	= 10;
	this.height = 2;
	this.active = true;
	this.x = x;
	this.y = y;

	this.main = m;

	this.draw = function()
	{
		this.main.context.fillStyle = 'cyan';
    	this.main.context.fillRect(this.x, this.y, this.width, this.height);
	}

	this.inBounds = function()
	{
		return this.x >= 0 && this.x <= this.main.getWidth();
	}

	this.update = function()
	{
		this.x += 15;
		this.active = this.active && this.inBounds();
	}


	this.draw();

	return this;
}