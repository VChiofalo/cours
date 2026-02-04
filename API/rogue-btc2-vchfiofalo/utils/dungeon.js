const generateId = require('./generateId');

module.exports = {
    generateRooms: (nb = 5) => {
        const rooms = [];
        for (let i = 0; i < nb; i++) {
            rooms.push({
                id: generateId(),
                monsters: [],
            });
        }
        return rooms;
    }
};