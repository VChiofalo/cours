const store = require('../data/store');
const generateId = require('../utils/generateId');

module.exports = {
    create: (player, rooms) => {
        const game = {
            id: generateId(),
            player,
            rooms,
            currentRoomIndex: 0,
            status: 'playing'
        };
        store.games.push(game);
        return game;
    },
    findById: (id) => store.games.find(g => g.id === id)
};