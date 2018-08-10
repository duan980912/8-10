var gulp = require("gulp");

var server = require("gulp-webserver");
var url = require("url");
var path = require("path");
var fs = require('fs');
var sass = require("gulp-sass");
var mincss = require("gulp-clean-css");
var swiperData = require("./mock/swiperList.js");
var listDate = require("./mock/list.js");
gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico" || pathname === "/js/lib/swiper.min.js.map") {
                    return false
                }
                if (pathname === "/") {
                    res.end(fs.readFileSync(path.join(__dirname, "src", "index.html")))
                } else {
                    var extname = path.extname(pathname);
                    if (extname) {
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    } else {
                        switch (pathname) {
                            case "/api/swiper":
                                res.end(JSON.stringify({ code: 0, msg: swiperData }));
                                break;
                            case "/api/list":
                                res.end(JSON.stringify({ code: 0, msg: listDate }));
                                break;
                            default:
                                res.end(JSON.stringify({ code: 3, msg: "error" }))
                        }
                    }
                }
            }
        }))
});
gulp.task("cssTask", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("./src/css"))
});
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("cssTask"));
});
gulp.task("dev", gulp.series("server", "cssTask", "watch"))