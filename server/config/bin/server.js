import app from '../app';

const http = require('http');

const port = parseInt(process.env.PORT, 10) || 7070;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = server;
