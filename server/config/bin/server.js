import app from '../app';

const http = require('http');

const port = parseInt(process.env.PORT, 10) || 7070;
app.set('port', port);

const createdServer = http.createServer(app);
createdServer.listen(port);

module.exports = createdServer;
