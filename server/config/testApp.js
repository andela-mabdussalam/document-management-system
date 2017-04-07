/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */


import express from 'express';
import routes from './routes';
import path from 'path';
import authenticate from './middlewares/authentication';


// const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


// Set up the express app
const app = express();
const router = express.Router();



// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);
app.get('*', (req, res) => {
  console.log('hello');
});
// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('/', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));
// app.get('/users', users.findAll);
routes(router, authenticate);

module.exports = app;
