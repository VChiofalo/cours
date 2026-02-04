const gameRepo = require('../repositories/game.repo');
const playerRepo = require('../repositories/player.repo');
const monsterRepo = require('../repositories/monster.repo');
const dungeon = require('../utils/dungeon');

module.exports = {
    create: (playerId) => {
        const player = playerRepo.findById(playerId);
        if (!player) throw new Error('Player not found');

        // Generate rooms with random monsters
        const rooms = dungeon.generateRooms(5).map(room => {
            const monster1 = monsterRepo.create('Goblin', 30, 5);
            const monster2 = monsterRepo.create('Orc', 50, 10);
            const monster3 = monsterRepo.create('Squelette', 20, 13);
            const monster4 = monsterRepo.create('Dragon', 100, 16);
            room.monsters.push(monster1, monster2);
            return room;
        });

        return gameRepo.create(player, rooms);
    },

    move: (gameId) => {
        const game = gameRepo.findById(gameId);
        if (!game) throw new Error('Game not found');
        if (game.status !== 'playing') throw new Error('Game ended');

        const room = game.rooms[game.currentRoomIndex];
        if (room.monsters.length > 0) throw new Error('Cannot move, monsters still present');

        if (game.currentRoomIndex + 1 >= game.rooms.length) {
            game.status = 'win';
        } else {
            game.currentRoomIndex++;
        }
        return game;
    },

    attack: (gameId) => {
        const game = gameRepo.findById(gameId);
        if (!game) throw new Error('Game not found');
        if (game.status !== 'playing') throw new Error('Game ended');

        const room = game.rooms[game.currentRoomIndex];
        if (!room || room.monsters.length === 0) return game;

        const monster = room.monsters[0];
        monster.hp -= game.player.atk;
        if (monster.hp <= 0) {
            room.monsters.shift();
        }

        // Monster attacks back
        if (room.monsters.length > 0) {
            game.player.hp -= monster.atk;
            if (game.player.hp <= 0) game.status = 'lost';
        }
        return game;
    }
};