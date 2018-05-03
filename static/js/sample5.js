$(document).ready(function(){
	$("#setLocation").click(function () { //user clicks button
	    if ("geolocation" in navigator){ //check geolocation available 
	        //try to get user current location using getCurrentPosition() method
	        $("#setLocation").html("Getting location...");
	        navigator.geolocation.getCurrentPosition(function(position){ 
	        	console.log("Latitude: " + position.coords.latitude);
	        	console.log("Longitude: " + position.coords.longitude);
	            $("#setLocation").html("Location found! You may now continue.");
	            $("#setLocation").prop('disabled', true);
	        });
	    }else{
	        console.log("Browser doesn't support geolocation!");
	    }
	});
	$(".loading-gif").fadeOut('fast');

	$("#vehicleChoice").click(function() {
		$("#propertyChoice").removeClass('selected');
		$(this).addClass('selected');
		$("#carTick").show();
		$("#houseTick").hide();
	});

	$("#propertyChoice").click(function() {
		$("#vehicleChoice").removeClass('selected');
		$(this).addClass('selected');
		$("#houseTick").show();
		$("#carTick").hide();
	});

	$("#buyChoice").click(function() {
		$(".choiceBox").removeClass('selected');
		$(this).addClass('selected');
		$(".img-tick").hide();
		$("#buyTick").show();
	});

	$("#sellChoice").click(function() {
		$(".choiceBox").removeClass('selected');
		$(this).addClass('selected');
		$(".img-tick").hide();
		$("#sellTick").show();
	});

	$("#rentChoice").click(function() {
		$(".choiceBox").removeClass('selected');
		$(this).addClass('selected');
		$(".img-tick").hide();
		$("#rentTick").show();
	});

	$(".choiceFullBox").click(function() {
		$(".choiceFullBox").removeClass('selected');
		$("#slider-range").hide();
		$(".dollarRight").last().hide();
		$(this).addClass('selected');
	});

	$(".choiceFullBox").last().click(function() {
		$(".dollarRight").last().show();
		$("#slider-range").show();
	});


	$(".textNext").click(function(e) {
		e.preventDefault();
		var select = $(".selected").length;
		if (select == 0) {
			$("#errorText").html("Please select an option.");
		} else {
			$("#errorText").html("");
			var selText = $(".selected .dollarRight").html();
			console.log(selText);
			var payload = {"data": selText};
			$.ajax({
				type: 'post',
				url: '/setPrice',
				data: JSON.stringify(payload),
				contentType: 'application/json',
				dataType: 'json'
			}).done(function() {
				window.location.href = "/confirm";
			});
		}
	});

	setTimeout(function() {
		$(".row").first().fadeIn('slow');
	}, 1000);

	setTimeout(function() {
		$(".row").not(':first').fadeIn('slow');
	}, 2000);


	$( function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 100000,
			values: [ 0, 0 ],
			slide: function( event, ui ) {
				$( "#amount" ).html( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).html( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	} );
	
});