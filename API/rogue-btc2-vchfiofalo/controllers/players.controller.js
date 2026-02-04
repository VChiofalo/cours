const service = require('../services/players.service');

exports.create = (req, res) => {
    try {
        const player = service.create(req.body.name);
        res.status(201).json(player);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getAll = (req, res) => {
    res.json(service.getAll());
};