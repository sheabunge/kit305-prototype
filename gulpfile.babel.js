'use strict';

import {task, src, dest, series, parallel} from 'gulp';
import watch from 'gulp-watch';
import rename from 'gulp-rename';
import connect from 'gulp-connect';
import del from 'del';

import sourcemaps from 'gulp-sourcemaps';
import babelify from 'babelify';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';

task('test-js', () => {
	const options = {
		parserOptions: {
			ecmaVersion: 7,
			sourceType: 'module'
		},
		extends: 'eslint:recommended',
		rules: {
			'quotes': ['error', 'single'],
			'linebreak-style': ['error', 'unix'],
			'eqeqeq': ['warn', 'always'],
			'indent': ['error', 'tab', {'SwitchCase': 1}]
		}
	};

	return src('js/**/*.js')
		.pipe(eslint(options))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
});

task('js', () =>
	browserify({debug: true, entries: 'js/app.js'})
		.transform('babelify', {
			sourceMaps: true,
			presets: [['@babel/preset-env', {useBuiltIns: 'entry', corejs: '3'}]],
		})
		.bundle()
		.pipe(source('js/app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(rename({dirname: ''}))
		.pipe(dest('dist'))
		.pipe(connect.reload())
);

task('css', () =>
	src('css/style.scss')
		.pipe(rename({basename: 'app'}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			importer: require('node-sass-package-importer')()
		}).on('error', sass.logError))
		.pipe(postcss([
			require('autoprefixer')(),
			require('cssnano')()
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))
		.pipe(connect.reload())
);

task('fonts', series(
	() => del('dist/fonts/**/*'),
	() => src(['solid', 'regular'].map((style) => `node_modules/@fortawesome/fontawesome-pro/webfonts/fa-${style}-*`))
		.pipe(rename({dirname: ''}))
		.pipe(dest('dist/fonts'))
));

task('default', parallel('css', 'js'));

task('watch', series('default', (done) => {
	watch('css/**/*.scss', series('css'));
	watch('js/**/*.js', series('js'));

	const html_files = ['index.html', 'html/**/*.html'];
	watch(html_files, () => src(html_files).pipe(connect.reload()));

	done();
}));

task('connect', () => connect.server({livereload: true}));

task('serve', parallel('watch', 'connect'));
