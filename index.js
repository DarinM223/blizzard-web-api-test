'use strict';

var Hapi = require('hapi')
  , server = new Hapi.Server();

server.connection({ host: '127.0.0.1', port: 3000 });

server.route({
  method: 'GET',
  path: '/about',
  handler: function(req, res) {
    res({ author: 'Darin Minamoto', source: 'blahblahblah!' });
  }
});

server.route({
  method: 'POST',
  path: '/account',
  handler: function(req, res) {
    res('Not implemented yet!');
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, res) {
    res("Hello world!");
  }
});

server.start(function() {
  console.log('Server started!');
});
