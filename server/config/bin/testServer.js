import testApp from '../testApp';

const http = require('http');

const port = parseInt(process.env.PORT, 10) || 7070;
testApp.set('port', port);

const testserver = http.createServer(testApp);
testserver.listen(port);

module.exports = testserver;
