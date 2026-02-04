const generateId = require('../utils/generateId');

module.exports = {
    create: (name, hp, atk) => ({ id: generateId(), name, hp, atk })
};