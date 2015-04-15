'use strict';

var expect = require('chai').expect
  , request = require('superagent')
  , Hapi = require('hapi')
  , server = new Hapi.Server();

server.connection({ host: '127.0.0.1', port: 5000 });

server = require('../server.js')(server);


describe('Testing api', function() {
  before(function(done) {
    server.start(function() {
      console.log('Server started!');
      done();
    });
  });

  it('should properly return JSON for about route', function(done) {
    request.get('http://localhost:5000/about').end(function(err, res) {
      expect(err).to.be.a('null');
      expect(res.body).to.eql({ author: 'Darin Minamoto', source: 'http://github.com/DarinM223/blizzard-web-api' });
      done();
    });
  });

  describe('Testing /account route', function() {
  });
});
