const jwt = require('jsonwebtoken');

const sign = (data) => jwt.sign(data, process.env.JWTSECRET, { expiresIn: 60 * 60 }); // '1h'

const verify = (token) =>
  jwt.verify(token, process.env.JWTSECRET, (error, decoded) => (error ? { code: 401, error: error.message } : decoded));

const refresh = (token, refreshOptions) => {
  const payload = jwt.verify(token, process.env.JWTSECRET);
  delete payload.foundUser;
  
  return jwt.sign(refreshOptions, process.env.JWTSECRET);
}

module.exports = { sign, verify, refresh };
