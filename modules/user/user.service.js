/* eslint-disable camelcase */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

async function isUserExists(email) {
  const users = await User.query().where('users.email', email);
  return Boolean(users.length);
}

async function getUserByLogin(login) {
  return User.query().where('users.login', login).first();
}

async function getUserByEmail(email) {
  return User.query().where('users.email', email).first();
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

async function updatePassword(user_id, body) {
  const { newPassword, newPasswordAgain } = body;
  if (!newPassword || !newPasswordAgain) throw new Error('Not all fields are filled');
  if (newPassword !== newPasswordAgain) throw new Error('Password mismatch');

  return User.transaction(async (trx) => {
    const user = await User.query(trx).findById(user_id);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await User.query(trx).update(user).where('user_id', user_id);

    return User.query(trx).findById(user_id);
  });
}

async function isCurrentPasswordCorrect(user, currentPassword) {
  const match = await bcrypt.compare(currentPassword, user.password);
  return Boolean(match);
}

module.exports = {
  getUserByLogin, getUserByEmail, createUnactiveUser, isUserExists, increaseInvitesAmount, updatePassword, isCurrentPasswordCorrect,
};
