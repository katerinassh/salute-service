/* eslint-disable camelcase */
/* eslint-disable max-len */
const User = require('../../models/user.model');

async function isUserExists(email) {
  const users = await User.query().where('users.email', email);
  return Boolean(users.length);
}

async function getUserByLogin(login) {
  return User.query().where('users.login', login).first();
}

async function createUnactiveUser(email) {
  return User.query().insert({ email, is_active: false });
}

async function increaseInvitesAmount(user_id) {
  return User.transaction(async (trx) => {
    const user = await User.query(trx).findById(user_id);
    user.invites_amount -= 1;
    await User.query(trx).update(user).where('user_id', user_id);

    return User.query(trx).findById(user_id);
  });
}

module.exports = {
  getUserByLogin, createUnactiveUser, isUserExists, increaseInvitesAmount,
};
