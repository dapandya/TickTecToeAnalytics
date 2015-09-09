var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass'), 
    notify = require("gulp-notify"),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    bower = require('gulp-bower');

var config = {
     sassPath: './resources/sass',
     templatePath: './resources/templates',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
//             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

gulp.task('templates', function(){
    gulp.src('resources/templates/*.hbs')
      .pipe(handlebars())
      .pipe(wrap('<%= contents %>'))
      .pipe(declare({
          namespace: 'MyApp.templates'
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('public/js/template/'));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
     gulp.watch(config.templatePath + '/**/*.hbs', ['templates']); 
});

  gulp.task('default', ['bower', 'icons', 'css', 'watch' /*, 'templates'*/]);
