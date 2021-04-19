// window.onresize = function () { window.location.reload(); }

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
		if (scrolled > 0) {
			if ($(window).width() < 991.98) {
				$(".header .container").css({ "position": "fixed" })
				$(".header .container").css({ "width": "100%" })
				$(".header").css({ "padding": "55px 0" })
				$(".header .container").css({ "padding-top": "30px" })
				$(".header .container").css({ "padding-bottom": "30px" })
				$(".header .container").css({ "background-color": "#ffffff" })
				$(".header .container").css({ "top": "0" })
				$(".menu__list").css({ "top": "25px" })
			}
		}
		if (scrolled == 0) {
			if ($(window).width() < 991.98) {
				$(".header .container").css({ "position": "relative" })
				$(".header .container").css({ "padding-top": "" })
				$(".header .container").css({ "padding-bottom": "" })
				$(".header .container").css({ "background-color": "transparent" })
				$(".header").css({ "padding": "" })
				$(".menu__list").css({ "top": "25px" })
			}
		}
	}

	$('.menu__icon, .menu__list a').on('click', function () {
		$('.menu').toggleClass('menu--active');
		$('.burger-menu__htx').toggleClass('active');
	});

	$('.user__circle--button').on('click', function () {
		if ($(window).width() < 575.98) {
			if ($('.menu').find('menu--active')) {
				$('.menu').removeClass('menu--active')
			}
			if ($('.burger-menu__htx').find('active')) {
				$('.burger-menu__htx').removeClass('active')
			}
			$(".user__search").css({ "left": "0;" })
			$(".user__search").css({ "right": "0;" })
			$(".user__input").css({ "width": "100%;" })
			$(".user__input").css({ "border": "2px solid #edf1f4;" })
			// $(".user__circle--button").css({ "background-color": "#edf1f4" })
			$(".user__circle--button").css({ "z-index": "23" })
		}
	});

	$('.footer__open--services').on('click', function () {
		$('.footer__open--services').toggleClass('footer__open--active');
		if ($(".footer__info--services").is(":hidden")) {
			$(".footer__info--services").slideDown("slow");
		} else {
			$(".footer__info--services").slideUp("slow");
		}
		return false;
	});

	$('.footer__open--account').on('click', function () {
		$('.footer__open--account').toggleClass('footer__open--active');
		if ($(".footer__info--account").is(":hidden")) {
			$(".footer__info--account").slideDown("slow");
		} else {
			$(".footer__info--account").slideUp("slow");
		}
		return false;
	});

	$('.footer__open--newsletter').on('click', function () {
		$('.footer__open--newsletter').toggleClass('footer__open--active');
		if ($(".footer__wrap ").is(":hidden")) {
			$(".footer__wrap ").slideDown("slow");
		} else {
			$(".footer__wrap ").slideUp("slow");
		}
		return false;
	});

	$(".menu a, .footer__nav a").on("click", function (event) {
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
	var mixer2 = mixitup(containerEl2, config);

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