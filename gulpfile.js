
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const jade = require('jade');
const gulpJade = require('gulp-jade');

const path = {
	source: {
		root: './src',
		images: './src/images/**/**',
		sass: './src/styles/**/**/*.scss',
		sassMain: 'src/styles/main.scss',
		js: './src/scripts/**/**/*.js',
		jsMain: './src/scripts/main.js',
		jade: './src/**/*.jade'
	},
	build: {
		root: './build/',
		css: './build/assets/styles/',
		js: './build/assets/scripts/',
		images: './build/assets/images/',
	}
};


gulp.task('build-img', function() {
	return gulp.src(path.source.images)
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(path.build.images));
});


gulp.task('build-css', function() {
	return gulp.src(path.source.sassMain)
		.pipe(plumber())
		.pipe(sass({ 
			outputStyle: 'expanded',
			errLogToConsole: 'true',
			includePaths: path.source.sass, 
		}))
		.pipe(autoprefixer())
		.pipe(cleanCss())
		.pipe(plumber.stop())
		.pipe(gulp.dest(path.build.css));
});


gulp.task('build-js', function() {
	return;
});


gulp.task('build-html', function() {
	return gulp.src(path.source.root + '/index.jade')
		.pipe(plumber())
		.pipe(gulpJade({
			jade: jade,
			pretty: true
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(path.build.root))
});


gulp.task('clean', function() {
	return gulp.src(path.build.root, { read: false })
		.pipe(clean());
});


gulp.task('default', ['clean'], function() {
	gulp.run('build-html', 'build-css', 'build-js', 'build-img');
});

gulp.task('watch', function() {
	gulp.watch(path.source.sass, ['build-css']);
	gulp.watch(path.source.js, ['build-js']);
	gulp.watch(path.source.images, ['build-img']);
	gulp.watch(path.source.jade, ['build-html']);
});