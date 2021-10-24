/* eslint-disable camelcase */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../../models/user.model');
const { addPhoto } = require('../photo/photo.service');

async function isUserExists(email) {
  const users = await User.query().where('users.email', email);
  return Boolean(users.length);
}

async function getUserByLogin(login) {
  return User.query().withGraphJoined('photo').where('users.login', login).first();
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

async function updateUser(user_id, body) {
  const { login, name, birthday } = body;
  if (login) {
    const userWithSuchLogin = await getUserByLogin(login);
    if (userWithSuchLogin) throw new Error('- that login is taken -');
  }

  return User.transaction(async (trx) => {
    const user = await User.query(trx).findById(user_id);
    user.login = login || user.login;
    user.name = name || user.name;
    user.birthday = birthday || user.birthday;
    await User.query(trx).update(user).where('user_id', user_id);

    return User.query(trx).findById(user_id);
  });
}

async function updatePassword(user_id, body) {
  const { currentPassword, newPassword, newPasswordAgain } = body;
  if (!currentPassword || !newPassword || !newPasswordAgain) throw new Error('Not all fields are filled');

  if (newPassword !== newPasswordAgain) throw new Error('Password mismatch');

  return User.transaction(async (trx) => {
    const user = await User.query(trx).findById(user_id);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new Error('Current password isn`t correct');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await User.query(trx).update(user).where('user_id', user_id);

    return User.query(trx).findById(user_id);
  });
}

async function updatePhoto(user_id, body) {
  const { newPhoto } = body;

  return User.transaction(async (trx) => {
    const user = await User.query(trx).findById(user_id);

    const photo = await addPhoto(newPhoto);
    user.photo_id = photo.photo_number;
    await User.query(trx).update(user).where('user_id', user_id);

    return User.query(trx).findById(user_id);
  });
}

module.exports = {
  getUserByLogin, createUnactiveUser, isUserExists, increaseInvitesAmount, updateUser, updatePassword, updatePhoto,
};
