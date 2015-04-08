'use strict';

exports.up = function(knex, Promise) {
   return knex.schema.createTable('characters', function(t) {
    t.increments().primary();
    t.string('name').notNull(); // doesn't have to be unique?
    t.integer('level').notNull();
    t.string('race').notNull();
    t.string('class').notNull();
    t.string('faction').notNull();
    t.integer('character_type').nullable();
    t.integer('account_id').unsigned().notNullable().references('account_id').inTable('accounts');
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('characters');
};
