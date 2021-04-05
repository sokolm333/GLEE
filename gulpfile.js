const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass'); // модуль для компиляции SASS (SCSS) в CSS
const group_media = require('gulp-group-css-media-queries'); // модуль для сборки media запросов в CSS файлах
const concat = require('gulp-concat'); // модуль для конкатинации файлов (+переименование)
const autoprefixer = require('gulp-autoprefixer'); // модуль для автоматической установки автопрефиксов
const uglify = require('gulp-uglify'); // модуль для минимизации JavaScript
const cleanCSS = require('gulp-clean-css'); // модуль для минимизации CSS
const imagemin = require('gulp-imagemin'); // модуль для сжатия PNG, JPEG, GIF и SVG изображений
const del = require('del'); // модуль для удаления файлов и каталогов
const browserSync = require('browser-sync').create(); // сервер для работы и автоматического обновления страниц
const fonter = require('gulp-fonter'); // модуль для конвертации otf-шрифтов в ttf
const ttf2woff = require('gulp-ttf2woff'); // конвертация ttf-шрифтов в woff
const ttf2woff2 = require('gulp-ttf2woff2'); // конвертация ttf-шрифтов в woff2
const svg_sprite = require('gulp-svg-sprite'); // модуль для создания спрайтов

//*=============Создание svg спарйтов============
function svgSprite() {
	return src('app/img/**/*.svg')
		.pipe(svg_sprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"  //sprite file name
				}
			},
			svg: {
				xmlDeclaration: false,
				doctypeDeclaration: false
			}
		}))
		.pipe(dest('app/img'))
}

//*=============Функции============

//*----------Browser-sync----------
function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		notify: false
	});
}

//*-------------Стили--------------
function styles() {
	return src('app/scss/style.scss')
		.pipe(scss())
		.pipe(group_media())
		// .pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserlist: ['last 10 version'],
			cascade: true,
			// grid: false
			grid: true
		}))
		.pipe(cleanCSS({
			level: {
				1: {
					all: false, // устанавливаем все значения на `false`
					tidySelectors: true // включает оптимизирующие селекторы
				},
				2: {
					all: false,
					removeDuplicateRules: true // включает удаление повторяющихся правил
				}
			}
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

//*-------------Скрипты------------
function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/slick-carousel/slick/slick.min.js',
		'node_modules/mixitup/dist/mixitup.min.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

//*--------Сжатие картинок----------
function images() {
	return src('app/img/**/*.{jpg,png,svg,gif,ico,webp}')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizeationLevel: 3 /* 0 to 7 */ }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/img'))
}

//*-----Конвертация шрифтов---------
function otf2ttf() {
	return src('app/fonts/*.otf')
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest('app/fonts'))
}

function woff() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff())
		.pipe(dest('app/fonts'))
}

function woff2() {
	return src('app/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts'))
}

function cleanFonts() {
	return src('app/fonts/'), // необходимо для корректного выполнения серии fonts
		del('app/fonts/*.{ttf,otf}')
}

//*========Функция сборки===========
function build() {
	return src([
		'app/**/*.html',
		'!app/**/_*.html',
		'app/css/*.min.css',
		'app/js/*.min.js',
		'app/fonts/*.{woff,woff2}'
	], { base: 'app' })
		.pipe(dest('dist'))

}

function cleanDist() {
	return del('dist')
}

//*=Функция слежения за изменениями=
function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/img/**/*.svg'], svgSprite);
	watch(['app/**/*.html']).on('change', browserSync.reload);
}

//*===Подключение функций к gulp===
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.imagemin = imagemin;
exports.svgSprite = svgSprite;
exports.cleanDist = cleanDist;
exports.woff = woff;
exports.woff2 = woff2;
exports.cleanFonts = cleanFonts;

exports.watching = watching;

exports.fonts = series(otf2ttf, woff, woff2, cleanFonts);
exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, svgSprite, watching);
