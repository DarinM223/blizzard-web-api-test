'use strict';

/*
 * Development knex configuration, change for production
 */ 

var knexfile = require('./knexfile.js')
  , knex = require('knex')(knexfile.development);

module.exports = {
  knex: knex
};
