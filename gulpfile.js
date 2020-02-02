var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync  = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var uglify = require('gulp-uglify-es').default;
var cssmin = require('gulp-cssmin');
var notify = require('node-notifier');
var del  = require('del');
var fs = require('fs');
var package = JSON.parse(fs.readFileSync('./package.json'));
var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');
var paths = {
    styles: {
        src: ['./src/sass/**/*.scss', './src/sass/*.scss'],
        dest: './dist/assets/css/'
    },
    scripts: {
        src: [
            './src/js/game/*.js',
            './src/js/App.js'
        ],
        dest: './dist/assets/js/'
    },
    typescript: {
        src: [
            './src/ts/**/*.ts',
            './src/ts/App.ts'
        ],
        dest: './src/js/'
    },
    vendors: {
        src: [
            './src/js/lib/*.js'
        ],
        dest: './dist/assets/js/'
    }
};

sass.compiler = require('node-sass');

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
- COMPLETE
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
function complete(){
    notify.notify({
        title: package.name.toUpperCase().replace(/\-/gi, ' '),
        message: 'O projeto está atualizado',
        icon: path.join(__dirname, 'gulp.png'),
        appIcon: path.join(__dirname, 'gulp.png')
    });
};

function clean() {
    return del([ 'src/js' ]);
    //return;
}

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sass().on('error', function(error){
        console.info( error );
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.styles.dest))
    .on('end', function(){
        complete();
    });
}

function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
    //.pipe(concat('scripts.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', function(){
        complete();
    });
}

function typescript() {
    if(!tsProject){
        tsProject = ts.createProject('tsconfig.json');
    }
    
    return gulp.src(paths.typescript.src)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .on('end', function(){
            complete();
        });
}

function vendors() {
    return gulp.src(paths.vendors.src, { sourcemaps: true })
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest(paths.vendors.dest));
}


function watch() {
    gulp.watch([].concat(paths.typescript.src), gulp.series(clean, typescript));
    gulp.watch(paths.styles.src, styles);
}


var build = gulp.series(clean, gulp.parallel(styles, typescript, vendors));



exports.clean = clean;
exports.styles = styles;
exports.typescript = typescript;
exports.scripts = scripts;
exports.vendors = vendors;
exports.watch = watch;
exports.build = build;

/*
* Define default task that can be called by just running `gulp` from cli
*/
exports.default = build;