const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      await User.createUser(username, password);
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.updateUserById(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.deleteUserById(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ username: user.username }, 'secretpassword');
      res.json({ token });
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

module.exports = UserController;
