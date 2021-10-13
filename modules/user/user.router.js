const express = require('express');
const { authenticate } = require('../../middlewares/auth');
const { getUserByLogin } = require('./user.service');

const userRouter = express.Router();
userRouter.get('/me', authenticate, async (req, res) => {
  res.status(200).send(await getUserByLogin(req.user.login));
});

module.exports = { userRouter };
