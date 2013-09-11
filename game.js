(function() { return "use strict"; })();



( function ($) {
	
	// Prefetch Dom elements & init
	var dodgeball 		= $('#dodgeball'),
		startButton 	= $('.play'),
		pauseButton 	= $('.pause'),
		score 			= $('#current-score'),
		gameSummary 	= $('.game-area .summary'),
		summaryScore 	= $('.game-area .summary .score'),
		gameArea  		= $('.game-area'),
		gameAreaHeight 	= gameArea.height(),
		gameAreaWidth  	= gameArea.width(),
		playing			= false,
		gameOver 		= false,
		timerDisplay = $('#timer'),
		timer, colors = [
			'#FF0000', '#0000FF', '#FF0066', '#00CC00', '#800000', '#FF9900', '#660066'
		];

	// Disables/Enables a button
	var toggleButton = function(button) {
		if (button.attr('disabled')) {
            button.removeAttr('disabled');
        } else {
            button.attr('disabled', 'disabled');
        }
	}

	// Handles Enabling / Disabling play/pause guttons
	function toggleButtons() {
		toggleButton(startButton);
		toggleButton(pauseButton);
	}

	// Reset game area for new game
	function resetGame() {
		gameArea.removeClass('game-over');
		dodgeball.css('background-color', '#0000FF');
		gameSummary.hide();
	}

	// End current game & show stats
	function finishGame() {
		playing = false;
		gameOver = true;
		toggleButtons();
		gameArea.addClass('game-over');
		summaryScore.html(sum);
		gameSummary.show();
		dodgeball.hide();
	}

	// New game session
	function newGame() {
		timer = new Countdown(120, timerDisplay);
		timer.fire();
		playing = true;
		toggleButtons();
		dodgeball.show();
		animateDiv();
	}

	// Resume Existing
	function resumeGame() {
		playing = true;
		timer.fire();
		animateDiv();
		toggleButtons();
	}

	// Pause game
	function pauseGame() {
		toggleButtons();
		clearInterval(timer.ticker);
		playing = false;
	}

	// Converts RGB color to HEX equivalent
	function toHex(colorval) {
	    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); // Match the format rgb(0, 0, 255)
	    delete(parts[0]); // remove the first element which matches the entire string
	    for (var i = 1; i <= 3; ++i) {
	        parts[i] = parseInt(parts[i]).toString(16);
	        if (parts[i].length == 1) parts[i] = '0' + parts[i];
	    }
	    return '#' + parts.join('');
	}

	// Randomly pick new background color for the dodgeball
	function nextColor(currentColor) {
	    var i = Math.floor(Math.random() * colors.length);
	    while(colors[i] == currentColor.toUpperCase()) { // ensure the current color is not reselected
	        i = Math.floor(Math.random() * colors.length);
	    }
	    return colors[i];
	}

	// Make dodgeball flicker
	function colorize() {
		var currentColor = toHex(dodgeball.css('background-color'));
		dodgeball.css('background-color', nextColor(currentColor));
	}

	// Start the game. This action handles either creating a brand new game
	// ,resuming a paused game
	// or starting a whole new game if a previous game has ended
	startButton.click(function() {
		if (gameOver) {
			resetGame();
			newGame()
		} else {
			if (!playing) {
				if (!timer) {
					newGame();
				} else {
					resumeGame();
				}
			}
		}
	});

	// Handle pause click
	pauseButton.click(function() {
		pauseGame(); // obviously
	});

	// Computing the scores for every click
	var sum = 0;

	dodgeball.click(function() {
		if (playing) { 
			colorize();
			sum += 100;
			score.html(sum);
		}
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
        	if (timer.active) {
        		if (playing) {
        			animateDiv();
        		}
        	} else {
        		finishGame();
        	}
		});
	}

} )(jQuery);