'use strict';

var Hapi = require('hapi')
  , Boom = require('boom')
  , Account = require('./models/account.js')
  , Character = require('./models/character.js')
  , knex = require('./config.js').knex
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
    Account.fetchAll().then(function(accounts) {
      var parsedAccounts = accounts.map(function(account) {
        return { 
          account_id: account.attributes.account_id, 
          account_name: account.attributes.name,
          link: '{your-service-url}/account/' + account.attributes.name
        };
      });
      res({ accounts: parsedAccounts }); 
    }).catch(function(e) {
      res(Boom.wrap(e, 500));
    });
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
      new Account({
        name: req.payload.name
      }).save().then(function(account) {
        res({ account_id: account.id }); 
      }).catch(function(e) {
        res(Boom.wrap(e, 401));
      });
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
    return knex('accounts').where('name', req.params.account_name).del().then(function(numRows) {
      res();
    }).catch(function(e) {
      console.log(e);
      res(Boom.wrap(e, 500));
    });
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
