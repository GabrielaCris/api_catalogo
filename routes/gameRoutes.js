const express = require('express');
const path = require('path');
const router = express.Router();
const GameController = require(path.resolve(__dirname, '../controllers/gameController'));
router.use(GameController.verifyToken);

router.post('/', GameController.createGame);
router.get('/', GameController.getAllGames);
router.get('/:id', GameController.getGameById);
router.put('/:id', GameController.updateGameById);
router.delete('/:id', GameController.deleteGameById);

module.exports = router;
