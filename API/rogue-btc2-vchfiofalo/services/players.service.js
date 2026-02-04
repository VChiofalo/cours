const repo = require('../repositories/player.repo');

module.exports = {
    create: (name) => repo.create(name),
    getAll: () => repo.findAll(),
    getById: (id) => repo.findById(id)
};