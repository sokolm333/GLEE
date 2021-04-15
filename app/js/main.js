window.onresize = function () { window.location.reload(); }

$(function () {

	var scrolled;
	window.onscroll = function () {
		scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if (scrolled > 110) {
			$(".menu__list").css({ "border-bottom": "3px solid #ffffff" })
			$(".menu__list").css({ "padding": "20px" })
			$(".menu__list").css({ "width": "100%" })
			$(".menu__list").css({ "background-color": "#fcd7b6" })
			$(".menu__list").css({ "justify-content": "space-evenly" })
			if ($(window).width() > 991.98) {
				$(".menu__list").css({ "position": "fixed" })
				$(".menu__list").css({ "top": "0" })
			}
		}
		if (scrolled < 110) {
			$(".menu__list").css({ "position": "absolute" })
			$(".menu__list").css({ "right": "0" })
			$(".menu__list").css({ "border-bottom": "none" })
			$(".menu__list").css({ "padding": "20px" })
			$(".menu__list").css({ "width": "100%" })
			$(".menu__list").css({ "background-color": "#fcd7b6" })
			$(".menu__list").css({ "justify-content": "space-evenly" })
			if ($(window).width() > 991.98) {
				if ($(window).width() > 1399.98) { $(".header").css({ "padding-bottom": "85px" }) }
				$(".menu__list").css({ "top": "70px" })
			}
		}
	}

	$('.menu__icon, .menu__list a').on('click', function () {
		$('.menu').toggleClass('menu--active');
		$('.burger-menu__htx').toggleClass('active');
		if ($(window).width() < 575.98) {
			if (document.querySelector(".menu").classList.contains("menu--active")) {
				$(".header").css({ "padding": "13px 0" })
				$(".header").css({ "height": "auto" })
				$(".header").css({ "overflow": "visible" })
			} else {
				setTimeout(() => document.querySelector(".header").removeAttribute("style"), 500);
				// document.querySelector(".header").removeAttribute("style");
			}
		}
	});

	$(".menu a").on("click", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1500);
	});

	$('.product-slider__top').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		slidesToShow: 1,
	});

	$('.partners__items').slick({
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		variableWidth: true,
		centerPadding: "0",
	});

	var containerEl1 = document.querySelector('[data-ref="container-1"]');
	var containerEl2 = document.querySelector('[data-ref="container-2"]');

	var config = {
		controls: {
			scope: 'local'
		}
	};

	var mixer1 = mixitup(containerEl1, config);
	// var mixer2 = mixitup(containerEl2, config);

	// if (containerEl1) {
	// 	mixer1 = mixitup(containerEl, {
	// 		selectors: { control: '[data-mixitup-control]' },
	// 		load: { filter: '.engagement-ceremony' }
	// 	});
	// }

	// if (containerEl2) {
	// 	mixer2 = mixitup(containerEl, {
	// 		selectors: { control: '[data-mixitup-control]' },
	// 		load: { filter: '.engagement-ceremony' }
	// 	});
	// }

});