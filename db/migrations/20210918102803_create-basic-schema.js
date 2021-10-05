exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema
    .createTable('photos', (table) => {
      table.uuid('photo_id').unique().notNullable().primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('body', 255);
      table.boolean('is_main').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .raw('ALTER TABLE photos ADD COLUMN photo_number SERIAL UNIQUE')

    .createTable('users', (table) => {
      table.uuid('user_id').unique().notNullable().primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email', 255).notNullable();
      table.string('login', 25);
      table.string('password', 255);
      table.string('name', 255);
      table.boolean('is_active');
      table.date('birthday');
      table.integer('invites_amount').defaultTo(2);
      table.integer('photo_id')
        .references('photo_number')
        .inTable('photos');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .raw('ALTER TABLE users ADD COLUMN user_number SERIAL UNIQUE;')

    .createTable('interests', (table) => {
      table.uuid('interest_id').unique().notNullable().primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name', 64);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .raw('ALTER TABLE interests ADD COLUMN interest_number SERIAL UNIQUE')

    .createTable('user_interest', (table) => {
      table.integer('user_interest_id').notNullable().primary();
      table.integer('user_id')
        .references('user_number')
        .inTable('users');
      table.integer('interest_id')
        .references('interest_number')
        .inTable('interests');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('chats', (table) => {
      table.uuid('chat_id').unique().notNullable().primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.integer('user1_id')
        .references('user_number')
        .inTable('users');
      table.integer('user2_id')
        .references('user_number')
        .inTable('users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .raw('ALTER TABLE chats ADD COLUMN chat_number SERIAL UNIQUE')

    .createTable('messages', (table) => {
      table.uuid('message_id').unique().notNullable().primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('type', 255);
      table.string('body', 255);
      table.boolean('is_read').defaultTo(false);
      table.integer('chat_id')
        .references('chat_number')
        .inTable('chats');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .raw('ALTER TABLE messages ADD COLUMN message_number SERIAL UNIQUE');
};

exports.down = async (knex) => knex.schema.dropTable('messages').dropTable('chats').dropTable('user_interest').dropTable('interests')
  .dropTable('users')
  .dropTable('photos');
