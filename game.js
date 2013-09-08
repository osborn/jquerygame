
$(document).ready(function(){
		// Calling the aniimate Div function
		$('#button').click(function(){
			$('.a').show();
			animateDiv();
		});

		// Computing the scores for every click
		var sum = 0;
		$('.a').click(function(){
			sum = sum + 100;
			$('#user').html('Your Score: '+sum);
		});
	});

	// This function returns an array of length 2 that contains a random point in my game-area div
	function makeNewPosition(){
		var h = $('#game-area').height();
		var w = $('#game-area').width();

		var nh = Math.floor(Math.random() * h);
    	var nw = Math.floor(Math.random() * w);

    	return [nh, nw];
	}

	// Creating the animate function to animate the div
	function animateDiv(){
		var newq = makeNewPosition();
    	$('.a').animate({ top: newq[0], left: newq[1] }, 1000, function(){
      	animateDiv();        
    	});
	}