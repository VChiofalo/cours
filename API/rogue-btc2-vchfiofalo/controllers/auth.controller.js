const authService = require('../services/auth.service');

exports.login = (req, res) => {
    try {
        const token = authService.login(req.body.username);
        res.json({ token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.register = (req, res) => {
    try {
        const admin = authService.register(req.body.username, req.body.password);
        res.status(201).json(admin);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};