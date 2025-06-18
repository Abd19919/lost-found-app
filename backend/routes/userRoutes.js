const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require('../controllers/userController');
const { verifyToken, authorizeAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin-only routes
router.get('/', verifyToken, authorizeAdmin, getAllUsers);
router.delete('/:userId', verifyToken, authorizeAdmin, deleteUser);
router.put('/:userId', verifyToken, authorizeAdmin, updateUser);

module.exports = router;