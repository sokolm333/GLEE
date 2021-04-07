$(function () {

	$('.product-slider__top').slick({
		dots: true,
		// autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
	});



	var containerEl1 = document.querySelector('[data-ref="container-1"]');
	var containerEl2 = document.querySelector('[data-ref="container-2"]');

	var config = {
		controls: {
			scope: 'local'
		}
	};

	var mixer1 = mixitup(containerEl1, config);
	var mixer2 = mixitup(containerEl2, config);

});