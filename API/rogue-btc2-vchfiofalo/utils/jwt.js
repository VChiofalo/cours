require('dotenv').config();

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports = {
    sign: (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }),
    verify: (token) => jwt.verify(token, SECRET)
};