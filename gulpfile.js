var gulp = require("gulp");
var browserSync = require("browser-sync");
var prefix = require("gulp-autoprefixer");
var cp = require("child_process");

var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task("jekyll-build", function(done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll, ["build"], { stdio: "inherit" }).on("close", done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task("jekyll-rebuild", ["jekyll-build"], function() {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task("browser-sync", ["jekyll-build"], function() {
  browserSync({
    server: {
      baseDir: "_site"
    },
    notify: false
  });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task("watch", function() {
  gulp.watch(
    [
      "*.html",
      "_layouts/*.html",
      "_posts/**",
      "_includes/*",
      "./*.html",
      "assets/project-assets/**/*.css",
      "assets/css/**",
      "assets/js/**"
    ],
    ["jekyll-rebuild"]
  );
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", ["browser-sync", "watch"]);
