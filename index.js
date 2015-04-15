'use strict';

var Hapi = require('hapi')
  , server = new Hapi.Server();

server.connection({ host: '127.0.0.1', port: 3000 });

server = require('./server.js')(server);

server.start(function() {
  console.log('Server started!');
});
