(function() { return "use strict"; })();



( function ($) {

	//creating the time Objects
	var skip = false;
	var secs = 0; 
	var mins = 0;
	var timerObj;
	var sum = 0;
		// Calling the aniimate Div function

	var dodgeball 		= $('#dodgeball'),
		startButton 	= $('#button'),
		player 			= $('#user'),
		gameArea  		= $('#game-area'),
		gameAreaHeight 	= gameArea.height(),
		gameAreaWidth  	= gameArea.width();


	startButton.click(function(){
		dodgeball.show();
		animateDiv();
		resetGame();
	});

		
	var sum = 0;

	dodgeball.click(function() {
		sum += 100;
		player.html('Your Score: ' + sum);

		// this will make the dodgeball flicker
		setInterval(function(){dodgeball.css('background-color', 'blue');}, 1000);
		dodgeball.css('background-color', 'red');
		controlTime();

	});
	
	// This function returns an array of length 2 that contains a random point in my game-area div
	function makeNewPosition() {
		var h = gameAreaHeight - 25;
		var w = gameAreaWidth  - 25;

		var nh = Math.floor(Math.random() * h);
		var nw = Math.floor(Math.random() * w);

		return [nh, nw];
	}

	// Creating the animate function to animate the div
	function animateDiv(){
		var newq = makeNewPosition();
		dodgeball.animate({ top: newq[0], left: newq[1] }, 500, function(){
			if (!skip)
			{
				animateDiv();
			}
			else{
				clearInterval(timerObj);
				$('#timer').html("Timer: Game Over");
				dodgeball.hide();
				gameArea.html("Game Over");
			}
		});
	}

	function controlTime(){
		clearTimeout(timeObj);
		timeObj = setTimeout(function(){skip = true}, 60000);
	}

	function timer(){
		timerObj = setInterval(function(){
			secs++;
			reset = false;
			sec = secs%60;
			if (secs%60 == 0){
				mins++;
			}
			$('#timer').html("Timer: "+mins.toString()+" : "+sec.toString());
		}, 1000)
	}

	function resetGame(){
		skip = false;
		sum = 0;
		secs = 0;
		mins = 0;
		$('#user').html('Your Score: '+sum);

		timeObj = setTimeout(function(){skip = true}, 60000);
		clearInterval(timerObj);
		timer();
		
	}


} )(jQuery);
