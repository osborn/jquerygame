(function() { return "use strict"; })();



( function ($) {
	// Calling the aniimate Div function

	var dodgeball = $('#dodgeball');

	$('#button').click(function(){
		dodgeball.show();
		animateDiv();
	});

	// Computing the scores for every click
	
	var sum = 0;
	dodgeball.click(function(){
		sum += 100;
		$('#user').html('Your Score: '+sum);

		// this will make the dodgeball flicker
		setInterval(function(){dodgeball.css('background-color', 'blue');}, 1000);
		dodgeball.css('background-color', 'red');
	});
	
	// This function returns an array of length 2 that contains a random point in my game-area div
	function makeNewPosition(){
		var game_area = $('#game-area');
		var h = game_area.height() - 25;
		var w = game_area.width() - 25;

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
