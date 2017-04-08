import app from '../app';

const http = require('http');

const port = parseInt(process.env.PORT, 10) || 7070;
app.set('port', port);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/index.html'));
});

const createdServer = http.createServer(app);
createdServer.listen(port);

module.exports = createdServer;
