const jwt = require('jsonwebtoken');
const SECRET = 'mysecretkey';

module.exports = {
    sign: (payload) => jwt.sign(payload, SECRET, { expiresIn: '1h' }),
    verify: (token) => jwt.verify(token, SECRET)
};