const service = require('../services/games.service');

exports.create = (req, res) => {
    try {
        const game = service.create(req.body.playerId);
        res.status(201).json(game);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.move = (req, res) => {
    try {
        const game = service.move(req.params.id);
        res.json(game);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.attack = (req, res) => {
    try {
        const game = service.attack(req.params.id);
        res.json(game);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};