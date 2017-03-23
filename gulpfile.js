const gulp = require('gulp');

const exec = require('child_process').exec;

gulp.task('nodestart', (cb) => {
  exec('node server/config/server.js', (err) => {
    cb(err);
  });
});

gulp.task('default', ['nodestart'], () => {
});

