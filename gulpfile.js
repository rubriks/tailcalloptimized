// include
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    bower = require('gulp-bower'),
    del = require('del');

// config
var build = {
    styles: {
        source: '_src/styles/main.scss',
        sources: '_src/styles/**/*.scss',
        target: 'dist/assets/css'
    },
    scripts: {
        source: ['bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js', 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrapi/collapse.js', '_src/scripts/**/*.js'],
        target: 'dist/assets/js'
    },
    images: {
        source: '_src/images/**/*',
        target: 'dist/assets/img'
    },
    icons: {
        target: 'dist/assets/fonts'
    },
    bower: {
        target: './bower_components'
    }
};

gulp.task('styles', function() {
    return sass(build.styles.source, { 
            style: 'expanded',
            loadPath: [
                '_src/styles',
                build.bower.target + '/bootstrap-sass-official/assets/stylesheets',
                build.bower.target + '/fontawesome/scss'
            ]
        })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(build.styles.target))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(build.styles.target))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src(build.scripts.source)
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(build.scripts.target))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(build.scripts.target))
        .pipe(notify({ message: 'Script task complete' }));
});

gulp.task('images', function() {
    return gulp.src(build.images.source)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(build.images.target))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('icons', function() {
    return gulp.src(build.bower.target + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(build.icons.target));
}); 

gulp.task('clean', function(cb) {
    del([build.styles.target, build.scripts.target, build.images.target], cb);
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(build.bower.target));
});

gulp.task('watch', function() {
    // watch source files and run tasks on change
    gulp.watch(build.styles.sources, ['styles']);
    gulp.watch(build.scripts.source, ['scripts']);
    gulp.watch(build.images.source, ['images']);

    // create live reload server
    livereload.listen();

    // watch files in dist and reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'icons');
});


