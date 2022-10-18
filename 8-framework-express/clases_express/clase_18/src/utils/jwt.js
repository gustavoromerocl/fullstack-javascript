const jwt = require('jsonwebtoken');

const privateKey = 'l%hl^1Gjh@10G#sbdV2n*y#CERhb0yD4f4SWT3QC5UXeH$1hAq';

const sign = (data) => jwt.sign(data, privateKey, { expiresIn: 60 * 60 }); // '1h'

const verify = (token) =>
  jwt.verify(token, privateKey, (error, decoded) => (error ? { code: 401, error: error.message } : decoded));

module.exports = { sign, verify };
