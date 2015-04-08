'use strict';

module.exports = function(server) {
  /**
   * Returns the author and the source link of the api
   */
  server.route({
    method: 'GET',
    path: '/about',
    handler: function(req, res) {
      res({ author: 'Darin Minamoto', source: 'http://github.com/DarinM223/blizzard-web-api' });
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
                'characters.faction', 'characters.account_id')
        .then(function(characters) {
          if (characters.length > 0) {
            var parsedCharacters = characters.map(function(character) {
              return _.omit(character, 'account_id');
            });
            res({ account_id: characters[0].account_id, characters: parsedCharacters });
          } else {
            res(characters);
          }
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
          throw new Error('Account does not exist');
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
      return knex('accounts').where({ account_name: req.params.account_name }).del().then(function(numRows) {
        if (numRows > 0) {
          res();
        } else {
          res(Boom.wrap(new Error('Account does not eist'), 401));
        }
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
      knex('characters')
        .where('name', req.params.character_name)
        .whereIn('account_id', function() {
          this.select('account_id').from('accounts').where('account_name', req.params.account_name);
        })
        .del().then(function(numRows) {
          if (numRows > 0) {
            res();
          } else {
            res(Boom.wrap(new Error('Character does not exist'), 401));
          }
        });
    }
  });

  return server; 
};
