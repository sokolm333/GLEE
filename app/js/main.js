// window.onresize = function () { window.location.reload(); }

var header = $('.header__inner'),
	scrollPrev = 0;

window.onscroll = function () {
	var scrolled = $(window).scrollTop();

	if (scrolled > 50 && scrolled > scrollPrev) {
		header.addClass('header__inner--out');
		if ($('.burger--htx').find('burger--active')) {
			$('.burger--htx').removeClass('burger--active')
			$('.menu').removeClass('menu--active')
		}
	} else {
		header.removeClass('header__inner--out');
	}
	scrollPrev = scrolled;
};

$(function () {
	$('body').hide().fadeIn(1000);

	$('.burger, .menu__list a').on('click', function () {
		$('.menu').toggleClass('menu--active');
		$('.burger--htx').toggleClass('burger--active');
	});

	$('.user__circle--button').on('click', function () {
		if ($(window).width() < 575.98) {
			if ($('.menu').find('menu--active')) {
				$('.menu').removeClass('menu--active')
			}
			if ($('.burger--htx').find('burger--active')) {
				$('.burger--htx').removeClass('burger--active')
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