const { src, dest, watch, parallel, series } = require('gulp');

const fileinclude = require('gulp-file-include'); // модуль для объединения файлов @@include('_www.html')
const beautify = require('gulp-beautify'); // модуль для красивого форматирования HTML (CSS + JS), после fileinclude
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
const svgmin = require('gulp-svgmin'); // модуль для минимизации svg
const cheerio = require('gulp-cheerio'); // модуль для "очистки" svg спрайтов
const cleanSvg = require('gulp-cheerio-clean-svg'); // модуль для "очистки" svg спрайтов (npm install Hiswe/gulp-cheerio-clean-svg --save-dev)
const replace = require('gulp-replace'); // модуль для корректного отображения svg спрайтов
const svg_sprite = require('gulp-svg-sprite'); // модуль для создания спрайтов

//*=============Создание svg спарйтов============
function cleanSvgSprite() {
	return del('app/img/sprite.svg')
}

function svgSprite() {
	return src('app/img/**/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio(cleanSvg({
			tags: ['title', 'desc',],
			attributes: ['style', 'fill*', 'clip*', 'stroke*'],
			// attributes: ["style", "clip*", "stroke*"]
		})))
		.pipe(replace('&gt;', '>'))
		.pipe(svg_sprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"  //sprite file name
				}
			}
		}))
		.pipe(dest('app/img'))
}
// gulp svg

//*=============Функции============

//*----------Browser-sync----------
function browsersync(cb) {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		notify: false,
		host: 'localhost',
		port: 3000,
		open: 'external',
		logPrefix: 'server',
		browser: 'chrome'
	});
	cb();
}

//*-----------Сборка html----------
function html() {
	return src(['app/html/**/*.html', '!app/html/**/_*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(beautify.html({ indent_size: 2 }))
		.pipe(dest('./app'))
		// .pipe(browserSync.stream())
		.pipe(browserSync.reload({ stream: true }))
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
			grid: false
			// grid: true
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
		'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
		'node_modules/rateyo/src/jquery.rateyo.js',
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
		.pipe(dest('docs/img'))
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
		'app/**/*.html', '!app/html/*', '!app/**/_*.html',
		'app/css/*.min.css',
		'app/js/*.min.js',
		'app/fonts/*.{woff,woff2}',
		'app/img/sprite.svg'
	], { base: 'app' })
		.pipe(dest('docs'))
}

function cleanDist() {
	return del('docs')
}

//*=Функция слежения за изменениями=
function watching() {
	watch(['app/html/**/*.html'], html);
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	// watch(['app/**/*.html'], html).on('change', browserSync.reload);
	// watch(['app/img/**/*.svg'], svg);
}

function cb() { } // коллбэк

//*===Подключение функций к gulp===
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.imagemin = imagemin;
exports.cleanDist = cleanDist;
exports.woff = woff;
exports.woff2 = woff2;
exports.cleanFonts = cleanFonts;
exports.html = html;

exports.watching = watching;

exports.svg = series(cleanSvgSprite, svgSprite);
exports.fonts = series(otf2ttf, woff, woff2, cleanFonts);
exports.build = series(cleanDist, html, images, build);
exports.default = parallel(styles, scripts, html, browsersync, watching);

exports.cb = cb;