const gulp = require('gulp');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require ('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const gitignore = require('gulp-gitignore');


gulp.task('watchHtml', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('imagemin', function() {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
})

gulp.task('minify', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('sass', function() {
  gulp.src('src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest('dist/css'))

})

gulp.task('ignore', function () {
    return gulp.src('src/**/*')
        // exclude files defined in .gitignore
        .pipe(gitignore())
        .pipe(gulp.dest('dist'));
});

/* gulp.task('scripts', function() {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
}) */

gulp.task('default', ['watchHtml', 'imagemin', 'minify', 'sass'])

gulp.task('watch', function() {
  gulp.watch('src/img/*', ['imagemin']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.html', ['watchHtml']);
})
