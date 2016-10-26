const glob = require('glob');
const tapeRun = require('tape-run');
const tapSpec = require('tap-spec');
const browserify = require('browserify');

browserify(glob.sync(`${__dirname}/../tests/**/*.spec.js`))
  .bundle()
  .pipe(tapeRun({
    browser: 'chrome',
  }))
  .pipe(tapSpec())
  .pipe(process.stdout);
