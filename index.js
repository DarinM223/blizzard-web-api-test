'use strict';

var Hapi = require('hapi')
  , Boom = require('boom')
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
    knex.select('account_id', 'account_name').from('accounts').then(function(accounts) {
      var parsedAccounts = accounts.map(function(account) {
        return {
          account_id: account.account_id, 
          account_name: account.account_name,
          link: '{your-service-url}/account/' + account.account_name
        };
      });

      res({ accounts: parsedAccounts });
    }).catch(function(e) {
      console.log(e);
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
      knex('accounts').insert({ account_name: req.payload.name }, true).then(function(a) {
        if (a.length > 0) {
          res({ account_id: a[0] });
        } else {
          res(Boom.wrap(new Error(), 401));
        }
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
    knex('characters')
      .join('accounts', 'accounts.account_id', '=', 'characters.account_id')
      .where('accounts.account_name', req.params.account_name)
      .select('characters.name', 'characters.level', 'characters.race', 'characters.class',
              'characters.faction')
      .then(function(characters) {
        res(characters);
      }).catch(function(e) {
        console.log(e);
        res(Boom.wrap(e, 500));
      });
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
    // TODO: add validation
    knex('accounts').where('account_name', req.params.account_name)
      .select('account_id').then(function(result) {

      if (result.length <= 0) {
        res(Boom.wrap(new Error('Account does not exist'), 401));
        return;
      } 

      return knex('characters').insert({
        name: req.payload.name,
        level: req.payload.level,
        race: req.payload.race,
        'class': req.payload['class'],
        faction: req.payload.faction,
        account_id: result[0].account_id
      }, true);
    }).then(function(a) {
      if (a.length > 0) {
        res({ character_id: a[0] });
      } else {
        res(Boom.wrap(new Error(), 401));
      }
    }).catch(function(e) {
      res(Boom.wrap(e, 401));
    });
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
