const express = require('express');
const bodyParser = require('body-parser');
const { authRouter } = require('./modules/auth/auth.router');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.listen(process.env.APP_PORT, () => {
  console.log(`App listening on port ${process.env.APP_PORT}!`);
});
