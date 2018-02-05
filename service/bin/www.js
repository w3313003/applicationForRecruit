#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('zpservice:server');


const DBdata = require("../model/index");
const Usermodels = DBdata.getModels("user");
const Chatmodels = DBdata.getModels('chat');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '6060');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('sendMsg', data => {
    const { from, to, msg } = data,
      chatId = [from, to].sort().join('_');
    Chatmodels.create({ from, to, content: msg, chatId, create_time: new Date().toLocaleString() }, (err, doc) => {
      if(err) {
        return;
      }
      io.emit('receiveMsg', Object.assign({}, doc._doc));
    }) 
  })
})



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
