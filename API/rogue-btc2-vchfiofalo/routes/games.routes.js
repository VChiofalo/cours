const express = require('express');
const router = express.Router();
const controller = require('../controllers/games.controller');

router.post('/', controller.create);
router.post('/:id/move', controller.move);
router.post('/:id/attack', controller.attack);

module.exports = router;