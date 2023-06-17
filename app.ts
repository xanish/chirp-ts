import express, { Express } from 'express';
import * as http from 'http';
import { AddressInfo } from 'node:net';
import Debug from 'debug';

// Create express app instance.
const app: Express = express();

// Create HTTP server.
const server: http.Server = http.createServer(app);

// Create instance of debug module.
const debug: Debug.Debugger = Debug('chirp:server');

app.get('/', function (req, res, next) {
  res.json({ message: 'Hello, World!' });
});

// Get port from environment and store in Express.
const port = process.env.PORT || 3000;
app.set('port', port);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event.
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr: AddressInfo | string | null = server.address();
  if (addr) {
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}
