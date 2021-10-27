/* eslint-disable max-len */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  createUnactiveUser, isUserExists, increaseInvitesAmount, getUserByLogin, getUserByEmail, updatePassword,
} = require('../user/user.service');
require('dotenv').config();

async function logIn(body) {
  const { login, password } = body;

  const user = await getUserByLogin(login);
  const match = await bcrypt.compare(password, user.password);

  if (user && match) {
    const {
      user_id, email, birthday, photo_id, created_at, updated_at, user_number,
    } = user;
    const payload = {
      user_id,
      email,
      login,
      birthday,
      photo_id,
      created_at,
      updated_at,
      user_number,
    };
    return jwt.sign(payload, process.env.JWTSECRETKEY);
  }
  throw new Error('Login or password incorrect');
}

async function invite(body, user) {
  const { email } = body;

  if (user.invites_amount === 0) {
    throw new Error('Not enough invites amount');
  }

  if (!(await isUserExists(email))) {
    const newUser = await createUnactiveUser(email);
    await increaseInvitesAmount(user.user_id);

    return `http://${process.env.HOST}:${process.env.APP_PORT}/auth/register/id=${newUser.user_id}`;
  }
  throw new Error('User with such email already exists');
}

async function forgotPassword(email) {
  if (await isUserExists(email)) {
    const token = jwt.sign({ email }, process.env.JWTSECRETKEY, { expiresIn: '30m' });

    return `http://${process.env.HOST}:${process.env.APP_PORT}/auth/resetpass/${token}`;
  }
  throw new Error('User with such email doesn`t exist');
}

async function resetPassword(token, body) {
  const decryptedToken = jwt.verify(token, process.env.JWTSECRETKEY);
  const user = await getUserByEmail(decryptedToken.email);

  await updatePassword(user.user_id, body);
}

module.exports = {
  logIn, invite, forgotPassword, resetPassword,
};
