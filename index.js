'use strict';

var Hapi = require('hapi')
  , Boom = require('boom')
  , server = new Hapi.Server();

server.connection({ host: '127.0.0.1', port: 3000 });

/**
 * Returns the author and the source link of the api
 */
server.route({
  method: 'GET',
  path: '/about',
  handler: function(req, res) {
    res({ author: 'Darin Minamoto', source: 'blahblahblah!' });
  }
});

/**
 * Lists all accounts
 */
server.route({
  method: 'GET',
  path: '/account',
  handler: function(req, res) {
  }
});

/**
 * Creates a new account
 * @param {string} name the name of the new account
 */
server.route({
  method: 'POST',
  path: '/account',
  handler: function(req, res) {
    if (typeof(req.payload.name) === 'undefined' || req.payload.name === null) {
      // reply with error
      res(Boom.wrap(new Error('name parameter is not defined'), 401));
    } else {
      res('Not implemented yet!');
    }
  }
});

/**
 * List all characters for an account
 */
server.route({
  method: 'GET',
  path: '/account/{account_name}/characters',
  handler: function(req, res) {
  }
});

/**
 * Create a new character for an account
 * @param {string} name 
 * @param {integer} level 
 * @param {string} race 
 * @param {string} class 
 * @param {string} faction 
 */
server.route({
  method: 'POST',
  path: '/account/{account_name}/characters',
  handler: function(req, res) {
  }
});

/**
 * Remove an account
 */
server.route({
  method: 'DELETE',
  path: '/account/{account_name}',
  handler: function(req, res) {
  }
});

/**
 * Remove a character from an account
 */
server.route({
  method: 'DELETE',
  path: '/account/{account_name}/characters/{character_name}',
  handler: function(req, res) {
  }
});

server.start(function() {
  console.log('Server started!');
});
