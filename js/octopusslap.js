(function(window, $, undefined) {
	var app = window.octopus || (window.octopus = {});
	var $window = $(window);

	var currentPosition = 0;
	var targetPosition = 0;
	var browserWidth = 0;

	var loadedImages = 0;

	var autorun = function() {

		$("#octopusimage1").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#octopusimage2").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#octopusimage3").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#octopusimage4").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#octopusimage1").attr("src", "images/out1.jpg");
		$("#octopusimage2").attr("src", "images/out2.jpg");
		$("#octopusimage3").attr("src", "images/out3.jpg");
		$("#octopusimage4").attr("src", "images/out4.jpg");
		//$("#octopusimage3").attr("src", "images/new3.jpg");

		//startSlap();
	};

	var imageLoaded = function() {
		loadedImages++;

		if (loadedImages == 4) {
			$("#loader").animate({ opacity: 0 }, 500, "linear", function() {
				$("#loader").css("display","none");
			});
			setTimeout(function() {
				$("#allimages").css("display","block");
				$("#allimages").animate({ opacity: 1 }, 3000, "linear");
				if (isTouchDevice()) {
					setTimeout(function() {
						$("#introtext").css("display","block");
						$("#introtext").html("Drag your finger across the screen to slap!");
						$("#introtext").css("display","block");
						$("#introtext").animate({ opacity: 1 }, 1000, "linear");

						setTimeout(function() {
							$("#introtext").animate({ opacity: 0 }, 1000, "linear", function() {
								$("#introtext").css("display","none");
							});
						}, 3000);
					}, 1000);
				}

				startSlap();
			}, 500);
		}
	};

	var startSlap = function() {
		browserWidth = $(window).width();

		setInterval(function() {
			currentPosition += (targetPosition - currentPosition) / 4;
			var currentSlap = currentPosition / 640 * 93;
			currentSlap = Math.min(93, Math.max(0,currentSlap));
			var pos = Math.round(currentSlap) * -640;

			$("#allimages").css("left", pos);
		}, 30);

		$("body").bind('mousemove', function(e) {
			// $('#status').html(e.pageX +', '+ e.pageY);
			targetPosition = 640 - Math.max(0, Math.min(640, e.pageX - $('#octopuscontainer').offset().left));
			//targetPosition = browserWidth - (e.pageX - $('#octopuscontainer').offset().left);
			// console.log(targetPosition);
			$("#bugger").html(targetPosition);
		});

		$("body").bind('touchmove', function(e) {
			e.preventDefault();
			var touch = event.targetTouches[event.targetTouches.length-1];
			$("#bugger").html("TOUCH: " + touch.pageX + ", " + event.targetTouches.length);
			targetPosition = browserWidth - touch.pageX;
		});

		$(window).resize(function() {
			browserWidth = $(window).width();
		});
	};

	var isTouchDevice = function() {
		var el = document.createElement('div');
		el.setAttribute('ongesturestart', 'return;');
		return typeof el.ongesturestart === "function";
	};

	// On DOM ready
	$(autorun);

})(this, jQuery);
