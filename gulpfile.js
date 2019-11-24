const gulp          = require("gulp");
const browserSync   = require("browser-sync");
const sass 			= require("gulp-sass");
const rename		= require("gulp-rename");
const autoprefixer  = require("gulp-autoprefixer");
const cleanCSS 		= require("gulp-clean-css");
const htmlmin		= require("gulp-htmlmin");
const image 		= require("gulp-image");

gulp.task("server", function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task("styles", function() {
	return gulp
		   .src("src/sass/**/*.+(scss|sass|css)")
		   .pipe(sass(
			   {
					outputStyle: "compressed"
			   }
		   ).on("error", sass.logError))
		   .pipe(rename({
				prefix: "",
				suffix: ".min",
			}))
		   .pipe(autoprefixer())
		   .pipe(cleanCSS({
			   compatibility: "ie8"
		   }))
		   .pipe(gulp.dest("dist/css"))
		   .pipe(browserSync.stream());
});

gulp.task("htmlmin", function() {
	gulp
		.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.stream());
});

gulp.task("imagemin", function() {
	return	gulp
			.src("src/img/**/*")
			.pipe(image())
			.pipe(gulp.dest("dist/img"));
});

gulp.task("iconmin", function() {
	return	gulp
			.src("src/icons/**/*")
			.pipe(image())
			.pipe(gulp.dest("dist/icons"));
});

gulp.task("fonts", function() {
	return gulp
			.src("src/fonts/*")
			.pipe(gulp.dest("dist/fonts"));
});

gulp.task("phpmailer", function() {
	return gulp
			.src("src/phpmailer/**/*")
			.pipe(gulp.dest("dist/mailer"));
});

gulp.task("scripts", function() {
	gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

gulp.task("watch", function() {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
	gulp.watch("src/*.html").on("change", gulp.parallel("htmlmin"));
	gulp.watch("src/js/*.js").on("change", gulp.parallel("scripts"));
	gulp.watch("src/img/**/*").on("change", gulp.parallel("imagemin"));
	gulp.watch("src/icons/**/*").on("change", gulp.parallel("iconmin"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles", "htmlmin", "imagemin", "iconmin", "fonts", "phpmailer", "scripts"));