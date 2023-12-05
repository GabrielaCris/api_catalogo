const Game = require('../models/Game');
const jwt = require('jsonwebtoken');

const GameController = {
  createGame: async (req, res) => {
    try {
      const { title, genre, releaseYear } = req.body;
      const newGame = await Game.createGame(title, genre, releaseYear);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllGames: async (req, res) => {
    try {
      const games = await Game.findAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGameById: async (req, res) => {
    try {
      const game = await Game.findGameById(req.params.id);
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateGameById: async (req, res) => {
    try {
      const updatedGame = await Game.updateGameById(req.params.id, req.body);
      res.json(updatedGame);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteGameById: async (req, res) => {
    try {
      const deletedGame = await Game.deleteGameById(req.params.id);
      res.json(deletedGame);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verifyToken: (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, 'secretpassword', (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  },
};

module.exports = GameController;
