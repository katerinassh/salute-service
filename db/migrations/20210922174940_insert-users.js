exports.up = function (knex) {
  return knex('users')
    .insert([{
      email: 'ekaterina.shakiryanova@gmail.com', login: 'kshak', password: '12345678', name: 'Katerina Shakiryanova', is_active: true, birthday: '2002-10-12', photo_id: 1,
    }, {
      email: 'lyyubava@gmail.com', login: 'lyubava32', password: 'lyubava32', name: 'Lyubov Smagluk', is_active: true, birthday: '2001-12-20', photo_id: 2,
    }, {
      email: 'valeriiadidych@gmail.com', login: 'valeriiiad', password: 'valeriiiad', name: 'Valeria Didych', is_active: true, birthday: '2002-07-15', photo_id: 3,
    }]);
};

exports.down = function (knex) {
  return knex('users')
    .where({ login: 'kshak' } || { login: 'lyubava32' } || { login: 'valeriiiad' }).del();
};
