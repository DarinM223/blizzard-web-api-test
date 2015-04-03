'use strict';

/*
 * Development knex configuration, change for production
 */ 

var knexfile = require('./knexfile.js')
  , knex = require('knex')(knexfile.development)
  , bookshelf = require('bookshelf')(knex);

module.exports = {
  knex: knex,
  bookshelf: bookshelf
};
