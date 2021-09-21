const express = require('express');
const { login } = require('./auth.service');

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  try {
    res.status(200).send(login(req.body));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = { authRouter };
