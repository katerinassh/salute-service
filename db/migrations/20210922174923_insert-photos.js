exports.up = function (knex) {
  return knex('photos')
    .insert([{ body: '../photos/1' }, { body: '../photos/2' }, { body: '../photos/3' }]);
};

exports.down = function (knex) {
  return knex('photos')
    .where({ photo_id: 1 } || { photo_id: 2 } || { photo_id: 3 }).del();
};
