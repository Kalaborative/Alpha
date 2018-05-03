$(document).ready(function(){
	$(".loading-gif").fadeOut('fast');

	setTimeout(function() {
		$(".row").first().fadeIn('slow');
	}, 1000);

	setTimeout(function() {
		$(".row").not(':first').fadeIn('slow');
		$(".textWrapper").fadeIn('slow');
	}, 2000);	
});