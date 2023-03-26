const { src, dest, watch, parallel, series  } = require("gulp"),
  scss = require("gulp-sass")(require("sass")),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  clean = require('gulp-clean'),
  webphtml = require('gulp-webp-html'),
  webp = require('gulp-webp'),   
  imagemin = require('gulp-imagemin');

function style() {
  return src("app/scss/style.scss")
    .pipe(concat("style.min.css")) //может конкатенировать и переименовывать файлы
    .pipe(scss({ outputStyle: "expanded" })) //compressed - css в минифицированном виде
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"], //10
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function stylelib() {
  return src(["node_modules/normalize.css/normalize.css"])
    .pipe(concat("libs.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/css"));
}

function js() {
  return src("app/js/main.js")
    .pipe(concat("main.min.js")) //переименовываем
    .pipe(uglify()) //минификация
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src('app/images/**/*')
      .pipe(webp({
          quality: 80
      }))
      .pipe(dest('dist/images'))
      .pipe(src('app/images/**/*'))
      .pipe(imagemin())
      .pipe(dest('dist/images'))
}


// function jslib() {
//   return src([
//       'node_modules/jquery/dist/jquery.js',
//   ])
//       .pipe(concat('libs.min.js'))
//       .pipe(uglify())
//       .pipe(dest('app/js'))
//       .pipe(browserSync.stream())
// }

function browsersync() {
  browserSync.init({
    server: { baseDir: "app/" },
    notify: false, //отключает всплывающее уведомление в браузере
    online: true, //раздает IP адреса, но не может работать без интернета. Для офлайн режима пишем false
  });
}

function watching() {
  watch(["app/scss/**/*.scss"], style); //следит за файлами и запускает style если засекает изменения
  watch(["app/js/**/*.js", "!app/**/*.min.js"], js);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

function buildhtml() {
  return src('app/*.html')
      .pipe(webphtml())
      .pipe(dest('dist'))
}

function build() {
  return src([
      'app/css/libs.min.css',
      'app/css/style.min.css',
      // 'app/js/libs.min.js',
      'app/js/main.min.js',
      'app/fonts/**/*',
  ], { base: 'app' })  //чтобы в дист были такие же папки
      .pipe(dest('dist'))
}

function cleanDist() {
  return src('dist').pipe(clean())
}

exports.style = style;
exports.js = js;
exports.watching = watching;
exports.browsersync = browsersync;
exports.stylelib = stylelib;
exports.cleanDist = cleanDist;
exports.images = images;

exports.default = parallel(stylelib, style, js, browsersync, watching); //задаем дефолтную задачу для gulp
exports.build = series(cleanDist, images, build, buildhtml);
