var gulp = require( 'gulp' ),
	pug = require( 'gulp-pug' ),
	sass = require( 'gulp-sass' ),
	autopref = require('gulp-autoprefixer'),
	concat = require( 'gulp-concat' ),
	rename = require( 'gulp-rename' ),
	sync = require( 'browser-sync' );

gulp.task( 'pug', function() {
	return gulp.src( 'src/**.pug' )
	.pipe(pug())
	.pipe(gulp.dest( 'app/' ))
	.pipe(sync.reload({ stream: true }))
	} );

gulp.task( 'sass', function() {
	return gulp.src( 'src/**/**.sass' )
	.pipe(sass())
	.pipe(autopref({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(gulp.dest( 'app/css/' ))
	.pipe(sync.reload({ stream: true }))
	} );

gulp.task( 'jsconcat', function() {
	return gulp.src( 'src/**/**.js' )
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest( 'app/js/' ))
	.pipe(sync.reload({ stream: true }))
	} );

gulp.task( 'sync', function() {
	sync({
		server: {
			baseDir: 'app'
		},
		notify: false
		});
	});

gulp.task( 'watch', ['sync', 'sass', 'pug', 'jsconcat'], function() {
	gulp.watch( 'src/**/**.**', ['pug', 'sass', 'jsconcat'] );
});

gulp.task('default', ['watch']);