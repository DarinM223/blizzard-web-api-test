'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', function(t) {
    t.increments('account_id').primary();
    t.string('account_name').notNull().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts');
};
