const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require('../controllers/userController');
const { authorizeAdmin } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authorizeAdmin, getAllUsers);
router.delete('/:userId', authorizeAdmin, deleteUser);
router.put('/:userId', authorizeAdmin, updateUser);

module.exports = router;