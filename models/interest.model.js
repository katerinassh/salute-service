const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Interest extends Model {
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get tableName() {
    return 'interests';
  }

  static get idColumn() {
    return 'interest_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        interest_id: { type: 'integer' },
        created_at: this.created_at,
        updated_at: this.updated_at,
        name: { type: 'string', minLength: 3, maxLength: 64 },
      },
    };
  }
}

module.exports = Interest;
