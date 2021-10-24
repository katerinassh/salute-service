/* eslint-disable camelcase */
const express = require('express');
const { authenticate } = require('../../middlewares/auth');
const {
  getUserByLogin, updateUser, updatePassword, updatePhoto,
} = require('./user.service');

const userRouter = express.Router();
userRouter.get('/me', authenticate, async (req, res) => {
  const user = await getUserByLogin(req.user.login);
  const {
    email, login, birthday, photo,
  } = user;
  res.status(200).send({
    email, login, birthday, photo: photo.body,
  });
});

userRouter.put('/me', authenticate, async (req, res) => {
  const { user_id } = req.user;

  try {
    if (req.body.currentPassword) {
      await updatePassword(user_id, req.body);
      res.status(200).send('Password was successfully changed');
    } else if (req.body.newPhoto) {
      await updatePhoto(user_id, req.body);
      res.status(200).send('Photo was successfully updated');
    } else {
      await updateUser(user_id, req.body);
      res.status(200).send('User was successfully updated');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { userRouter };
