const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Photo extends Model {
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get tableName() {
    return 'photos';
  }

  static get idColumn() {
    return 'photo_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['body', 'is_main'],

      properties: {
        photo_id: { type: 'integer' },
        created_at: this.created_at,
        updated_at: this.updated_at,
        body: { type: 'string', maxLength: 255 },
        is_main: { type: 'boolean' },
      },
    };
  }
}

module.exports = Photo;
