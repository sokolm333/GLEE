// window.onresize = function () { window.location.reload(); }

var header = $('.header__inner'),
	scrollPrev = 0;

window.onscroll = function () {
	var scrolled = $(window).scrollTop();

	if (scrolled > 50 && scrolled > scrollPrev) {
		header.addClass('header__inner--out');
		if ($('.dropdown').find('dropdown--active')) {
			// jQuery($('.menu__link--dropdown')).blur();
			$('.dropdown').fadeOut('slow').removeClass('dropdown--active');
			$('.menu__link').removeClass('menu__link--active');
			$('.menu__item').removeClass('menu__item--active');
		}
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
		$('body').toggleClass('hide');
	});

	$('.menu__link--dropdown').on('click', function () {
		if ($(this).hasClass('menu__link--active')) {
			$('.dropdown').fadeOut('slow').removeClass('dropdown--active');
			$('.menu__link').removeClass('menu__link--active');
			$('.menu__item').removeClass('menu__item--active');
		} else {
			$('.dropdown').fadeOut('slow').removeClass('dropdown--active');
			$('.menu__link').removeClass('menu__link--active');
			$('.menu__item').removeClass('menu__item--active');
			$(this).addClass('menu__link--active').closest('.menu__item').addClass('menu__item--active');
			$('.menu__item--active').find('ul.dropdown').addClass('dropdown--active');
			$('.dropdown--active').fadeIn('slow');
		}
	});

	$('.menu__link--dropdown').on('blur', function () {
		$('.dropdown').fadeOut('slow').removeClass('dropdown--active');
		$('.menu__link').removeClass('menu__link--active');
		$('.menu__item').removeClass('menu__item--active');
	});

	// $('.menu__link--dropdown').on('focus', function () {
	// 	$('.dropdown').addClass('dropdown--active');
	// });

	// $('.menu__link--dropdown').on('blur', function () {
	// 	$('.dropdown').removeClass('dropdown--active');
	// 	$('.menu__link').toggleClass('menu__link--active');
	// });

	$('.user__circle--button').on('click', function () {
		if ($(window).width() < 575.98) {
			if ($('.menu').find('menu--active')) {
				$('.menu').removeClass('menu--active')
			}
			if ($('.burger--htx').find('burger--active')) {
				$('.burger--htx').removeClass('burger--active')
			}
			$('.user__search').css({ "left": "0;" })
			$('.user__search').css({ "right": "0;" })
			$('.user__input').css({ "width": "100%;" })
			$('.user__input').css({ "border": "2px solid #edf1f4;" })
			// $('.user__circle--button').css({ "background-color": "#edf1f4" })
			$('.user__circle--button').css({ "z-index": "23" })
		}
	});

	$('.filter__range').ionRangeSlider({
		step: 0.01,
		onStart: function (data) {
			// $('.filter__cost--from').attr('value', (data.from.toFixed(2)));
			// $('.filter__cost--from').text(data.from.toFixed(2));
			$('.filter__cost--from').prop("value", data.from.toFixed(2));
			$('.filter__cost--to').prop("value", data.to.toFixed(2));
			// $('.filter__cost--to').text(data.to.toFixed(2));
		},
		prefix: '$',
		onChange: function (data) {
			// $('.filter__cost--from').attr('value', (data.from.toFixed(2)));
			// $('.filter__cost--from').text(data.from.toFixed(2));
			$('.filter__cost--from').prop("value", data.from.toFixed(2));
			$('.filter__cost--to').prop("value", data.to.toFixed(2));
			// $('.filter__cost--to').text(data.to.toFixed(2));
		},
	});
	var
		instance = $('.filter__range').data("ionRangeSlider"),
		min = 0.00,
		max = 800.00;
	$('.filter__cost--from').on("change keyup", function () {
		var val_from = $(this).prop("value");
		// validate
		if (val_from < min) { val_from = min; } else if (val_from > max) { val_from = max; }
		instance.update({ from: val_from });
	});
	$('.filter__cost--to').on("change keyup", function () {
		var val_to = $(this).prop("value");
		// validate
		if (val_to < min) { val_to = min; } else if (val_to > max) { val_to = max; }
		instance.update({ to: val_to });
	});

	$('.filter__view-btn').on('click', function () {
		$('.filter__view-btn').removeClass('filter__view-btn--active');
		$(this).trigger('blur');
		$(this).addClass('filter__view-btn--active');
	});

	$('.filter__view-btn--list').on('click', function () {
		$('.shop__content').addClass('list');
	});

	$('.filter__view-btn--grid').on('click', function () {
		$('.shop__content').removeClass('list');
	});

	$('.footer__open').on('click', function () {
		if ($('.footer__open').hasClass('footer__open--active')) {
			$('.footer__info--out').slideUp('slow');
			$('.footer__open').removeClass('footer__open--active');
			$('.footer__wrap').removeClass('footer__open--active');
			$('.footer__column').removeClass('footer__column--active');
		} else {
			$(this).addClass('footer__open--active').closest('.footer__column').addClass('footer__column--active');
			$('.footer__column--active').find('.footer__info--out').slideDown('slow');
		}
		// $('.footer__info--out').slideUp('slow');
		// $('.footer__open').removeClass('footer__open--active');
		// $('.footer__wrap').removeClass('footer__open--active');
		// $('.footer__column').removeClass('footer__column--active');
		// $(this).addClass('footer__open--active').closest('.footer__column').addClass('footer__column--active');
		// $('.footer__column--active').find('.footer__info--out').slideDown('slow');
	});

	$('.footer__open').on('blur', function () {
		$('.footer__info--out').slideUp('slow');
		$('.footer__open').removeClass('footer__open--active');
		$('.footer__wrap').removeClass('footer__open--active');
		$('.footer__column').removeClass('footer__column--active');
	});

	$('.filter__btn').on('click', function () {
		$(this).toggleClass('filter__btn--active');
		if ($(this).hasClass('filter__btn--active')) {
			$('.filter__content:not(:last-child)').slideDown('slow');
		} else {
			$('.filter__content:not(:last-child)').slideUp('slow');
		}
	});

	$('.product-slider__top').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		slidesToShow: 1,
	});

	$('.partners__items').slick({
		centerMode: true,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		variableWidth: true,
		centerPadding: '0',
	});

	$('.filter__sort').styler();

	$('.filter__sort').on('click', function () {
		$('.jq-selectbox__trigger-arrow').toggleClass('jq-selectbox__trigger-arrow--active');
	});

	$('.filter__sort').blur(function () {
		$('.jq-selectbox__trigger-arrow').removeClass('jq-selectbox__trigger-arrow--active');
	});

	$('.jq-selectbox__dropdown').on('click', function () {
		$('.jq-selectbox__trigger-arrow').toggleClass('jq-selectbox__trigger-arrow--active');
	});

	var config = {
		controls: {
			scope: 'local'
		}
	}

	var containerEl1 = document.querySelector('[data-ref="container-popular"]');
	var mixer1;
	if (containerEl1) {
		mixer1 = mixitup(containerEl1, config);
	}

	var containerEl2 = document.querySelector('[data-ref="container-design"]');
	var mixer2;
	if (containerEl2) {
		mixer2 = mixitup(containerEl2, config);
	}

	var containerEl3 = document.querySelector('[data-ref="container-filter"]');
	var mixer3;
	if (containerEl3) {
		mixer3 = mixitup(containerEl3, config);
	}

	$('.shop__item:nth-child(4)~li').addClass('list--hide');

});