var gulp = require('gulp'); //  The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, etc 
var browserify  = require('browserify');
var reactify = require('reactify'); // Reactify is needed to convert JSX to JS
var source  = require('vinyl-source-stream'); // when we use browserify with gulp, gulp requires input that pipes through a stream
											  // browserify ends about putting up a string so we require vinyl source to convert strings into stream  

less = require('gulp-less');
gulp.task('browserify', function(){
	browerify('./src/js/main.js')
		.transform('reactify') // transform JSX to JS
		.bundle() // output in bundle
		.pipe(source('main.js')) // pipe into main.js
		.pipe(gulp.dest('dist/js')); // move into destination

});

gulp.task('copy', function(){
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
	gulp.src('src/assets/images/*.*')
		.pipe(gulp.dest('dist/assets/images'));		
	gulp.src('src/assets/css/bootstrap.css')
		.pipe(gulp.dest('dist/assets/css'));
});
gulp.task('build-less', function(){
    return gulp.src('src/assets/css/styles.less')
        .pipe(less())
        .pipe(gulp.dest('dist/assets/css'));
});
gulp.task('default',['browserify', 'build-less' , 'copy'], function(){
	return gulp.watch('src/**/*.*', ['browserify','build-less','copy'])
});

