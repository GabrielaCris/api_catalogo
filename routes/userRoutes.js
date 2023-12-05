const express = require('express');
const path = require('path')
const router = express.Router();

const UserController = require(path.resolve(__dirname, '../controllers/userController'));

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);

router.use(UserController.verifyToken);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);

module.exports = router;
