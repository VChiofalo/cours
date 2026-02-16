const store = require('../data/store');
const generateId = require('../utils/generateId');

module.exports = {
    create: (name) => {
        const player = 
        {
            id: generateId(),
            name,
            hp: 300,
            atk: 15
        };
        store.players.push(player);
        return player;
    },
    findById: (id) => store.players.find(p => p.id === id),
    findAll: () => store.players
};
