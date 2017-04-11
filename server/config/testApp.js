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
});
routes(router, authenticate);

module.exports = app;
