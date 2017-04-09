
// more info on Webpack's Node API here:
// https://webpack.github.io/docs/node.js-api.html
// allowing console calls below since this is a build file

/* eslint no-console: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off"*/
import webpack from 'webpack';
import colors from 'colors';
import webpackConfig from '../../../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red)
    );
  }
  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the foolowing warning: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow)
    );
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeded.
  console.log('Your app has been compiled in production mode and written to dist. It\'s ready to roll!'.green);

  return 0;
});
