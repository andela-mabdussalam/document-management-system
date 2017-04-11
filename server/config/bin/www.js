#!/usr/bin/env node

// This will be our application entry. We'll setup our server here.
// import http from 'http';
 /* eslint no-console: "off" */
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import app from '../server/app'; // express server
import config from '../webpack.config.dev';

const port = parseInt(process.env.PORT, 10) || 4000;

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
  } else if (process.env.NODE_ENV !== 'test') {
    open(`http://localhost:${port}`);
  }
});

export default app;
