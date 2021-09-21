const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = [
  {
    username: 'john',
    password: 'password123admin',
  }, {
    username: 'anna',
    password: 'password123member',
  },
];

function login(body) {
  const { username, password } = body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    return jwt.sign({ username: user.username }, process.env.JWTSECRETKEY);
  }
  throw new Error('Login or password incorrect');
}

module.exports = { login };
