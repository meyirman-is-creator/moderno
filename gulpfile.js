let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let rename = require('gulp-rename');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let cssmin = require('gulp-cssmin');
let autoprefixer = require('gulp-autoprefixer');
gulp.task('sass', async function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(rename({suffix:'.min'}))
        .pipe(autoprefixer({
            overrideBrowserlist:['last 10 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/rateyo/jquery.rateyo.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});
gulp.task('style', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/normalize.css/normalize.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/rateyo/jquery.rateyo.min.css'

    ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
});
gulp.task('html', function(){
    return gulp.src('app/*.html').pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function(){
    return gulp.src('app/js/*.js').pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: "app/"
        }
    });
});
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});
gulp.task('default', gulp.parallel('style','script','sass', 'watch', 'browser-sync'));
