'use strict';

var bookshelf = require('../config.js').bookshelf
  , Account = require('./account.js');

var Character = bookshelf.Model.extend({
  tableName: 'characters',

  account: function() {
    return this.belongsTo(Account, 'account_id');
  }
});

module.exports = Character;
