exports.up = function(knex) {
    return knex.schema
    .createTable('photos', (table) => {
        table.increments('photo_id').primary();
        table.string('body', 255);
        table.boolean('is_main');
    })

    .createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('email', 255).notNullable();
        table.string('login', 25);
        table.string('password', 255);
        table.string('name', 255);
        table.boolean('is_active');
        table.date('birthday');
        table.integer('photo_id')
            .references('photo_id')
            .inTable('photos');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('interests', (table) => {
        table.increments('interest_id').primary();
        table.string('name', 64);
    })

    .createTable('user_interest', (table) => {
        table.increments('user_interest_id').primary();
        table.integer('user_id')
            .references('user_id')
            .inTable('users');
        table.integer('interest_id')
            .references('interest_id')
            .inTable('interests');
    })

    .createTable('chats', (table) => {
        table.increments('chat_id').primary();
        table.integer('user1_id')
            .references('user_id')
            .inTable('users');
        table.integer('user2_id')
            .references('user_id')
            .inTable('users');
    })

    .createTable('messages', (table) => {
        table.increments('message_id').primary();
        table.string('type', 255);
        table.string('body', 255);
        table.boolean('is_read');
        table.integer('chat_id')
            .references('chat_id')
            .inTable('chats');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages').dropTable('chats').dropTable('user_interest').dropTable('interests').dropTable('users').dropTable('photos');
};
