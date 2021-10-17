const express = require('express');
const { logIn, invite, forgotPassword } = require('./auth.service');
const { authenticate } = require('../../middlewares/auth');
const { mailInvite, mailResetPassword } = require('../../helpers/nodemailer');

const authRouter = express.Router();
authRouter.post('/login', async (req, res) => {
  try {
    res.status(200).send(await logIn(req.body));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

authRouter.post('/invite', authenticate, async (req, res) => {
  const { email } = req.body;

  try {
    const link = await invite(req.body, req.user);
    res.status(200).send(await mailInvite(email, link));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post('/forgotpass', async (req, res) => {
  const { email } = req.body;

  try {
    const link = await forgotPassword(email);
    res.status(200).send(await mailResetPassword(email, link));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { authRouter };
