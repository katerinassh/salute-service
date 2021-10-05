/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const {
  getUserByLoginPassword, createUnactiveUser, isUserExists, increaseInvitesAmount,
} = require('../user/user.service');
require('dotenv').config();

async function logIn(body) {
  const { login, password } = body;

  const user = await getUserByLoginPassword(login, password);

  if (user) {
    const {
      user_id, email, birthday, photo_id, created_at, updated_at,
    } = user;
    const payload = {
      user_id,
      email,
      login,
      birthday,
      photo_id,
      created_at,
      updated_at,
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

    const token = jwt.sign(newUser.toJSON(), process.env.JWTSECRETKEY);
    return `http://${process.env.HOST}:${process.env.APP_PORT}/auth/register/id=${token}`;
  }
  throw new Error('User with such email already exists');
}

module.exports = { logIn, invite };
