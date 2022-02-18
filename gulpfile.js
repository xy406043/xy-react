const { series } = require('series')
const gulp = require('gulp')
const removeCode = require('gulp-remove-code')

const templatesDir = ['./src/adapter/chrome/manifest.json']

function templates() {
  return gulp.src(templatesDir, { base: './src' }).pipe(gulp.dest('../build'))
}

function removeDevCode() {
  return gulp
    .src('../**/*.ts')
    .pipe(removeCode({ production: true }))
    .pipe(
      gulp.dest(function (file) {
        return file.base
      })
    )
}

exports.default = series(templates)
exports.removeDevCode = series(removeDevCode)
