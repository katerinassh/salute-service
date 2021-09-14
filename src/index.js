const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on port ${process.env.APP_PORT}!`);
  });
