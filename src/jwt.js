//const jwt = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');

function makeToken(payload, cb) {
  const secretKey = 'authosaurussecretkeykeykeykeyhehehe';
  const options = { expiresIn: 60 * 60 };
  jwt.sign(payload, secretKey, options ,(err, token) => {
    if(err) cb(err);
    else cb(null, token);
  });
}

module.exports = makeToken;
