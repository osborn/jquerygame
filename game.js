(function() { return "use strict"; })();



( function ($) {
	console.log('ready');
	// Calling the aniimate Div function

	var dodgeball 		= $('#dodgeball'),
		startButton 	= $('.play'),
		score 			= $('#current-score'),
		gameArea  		= $('.game-area'),
		gameAreaHeight 	= gameArea.height(),
		gameAreaWidth  	= gameArea.width(),
		playing			= false;

	var togglePlay = function() {
		if (startButton.attr('disabled')) {
            startButton.removeAttr('disabled');
        } else {
            startButton.attr('disabled', 'disabled');
        }
	}

	startButton.click(function() {
		if (!playing) {
			playing = true;
			togglePlay();
			dodgeball.show();
			animateDiv();
		} else {
			console.log('already playing');
		}
	});

	// Computing the scores for every click
	var sum = 0;

	dodgeball.click(function() {
		sum += 100;
		score.html('Your Score: ' + sum);
	});
	
	// This function returns an array of length 2 that contains a random point in my game-area div
	function makeNewPosition() {
		var h = gameAreaHeight - 50;
		var w = gameAreaWidth  - 50;

		var nh = Math.floor(Math.random() * h);
		var nw = Math.floor(Math.random() * w);

		return [nh, nw];
	}

	// Creating the animate function to animate the div
	function animateDiv(){
		var newq = makeNewPosition();
        dodgeball.animate({ top: newq[0], left: newq[1] }, 1000, function(){
	  		animateDiv();
		});
	}

} )(jQuery);