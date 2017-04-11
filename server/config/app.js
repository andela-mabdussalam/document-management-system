//* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */


import express from 'express';
import webpack from 'webpack';
import path from 'path';
import compression from 'compression';
import routes from './routes';
import authenticate from './middlewares/authentication';
import config from '../../webpack.config';

const logger = require('morgan');
const bodyParser = require('body-parser');


// Set up the express app
const app = express();
const router = express.Router();

const compiler = webpack(config);
app.use(compression());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/index.html'));
});

routes(router, authenticate);

module.exports = app;
