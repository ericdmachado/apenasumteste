class Score {
	points = this.points = 0; 
	score  = this.score = 0;

	time = this.time = 0;
	fntime = this.fntime = 0;

	lim = this.lim = [];
	n = this.n = 1;

	this.getRandomPoints = function(point)
	{
		var t = this;
		//points += Math.round(Math.random() * 10);
		points += point;
		lim.push(1);


		$('#game-score span.add').text($('#game-score span.add').text() +'+'+ points);
		
		if(lim.length >= 3)
		{
			this.setPoints();
		}
		
		clearTimeout(fntime);
		fntime = setTimeout(function(){
			t.setPoints();	
		}, 600);

		return points;
	}

	this.setPoints = function()
	{
		$('#game-score span.add').addClass('more');

		clearTimeout(time);
		time = setTimeout(function(){
			$('#game-score span.add.more').remove();
			points = 0;
			lim = [];
			$('#game-score span.score').text(score);


			if(Math.floor(score / (n * 10000)) && $('.game-life .lifes').children().length < 5)
			{
				$('.game-life .lifes').append('<i class="ui-icon icon-heart new"></i>');
				n++;
				if(n > 10) n = 10;
			}

			//console.log(score / 10 , );
		}, 100);
	}


	get points(){
		if(!$('#game-score span.add').length) $('#game-score').append('<span class="add"></span>');
		$('#game-score span.add').removeClass('more');

		score = this.score = this.score + this.getRandomPoints(Math.round(point));
	}

	get score(){
		return parseInt($('#game-score span.score').text());
	}
}