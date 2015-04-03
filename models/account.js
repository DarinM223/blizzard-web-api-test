'use strict';

var bookshelf = require('../config.js').bookshelf
  , Character = require('./character.js');

var Account = bookshelf.Model.extend({
  tableName: 'accounts',

  characters: function() {
    return this.hasMany(Character);
  }
});

module.exports = Account;
