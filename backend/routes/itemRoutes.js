const express = require('express');
const router = express.Router();
const {
  createItem,
  getItems,
  getItemsByUser,
  getMyItems,
  deleteItem,
  updateItem
} = require('../controllers/itemController');
const { verifyToken } = require('../middleware/auth');

// Create a new item
router.post('/', verifyToken, createItem);

// Get all items (public or admin)
router.get('/', getItems);

// Get items by specific user ID
router.get('/user/:userId', getItemsByUser);

// Get logged-in user's items
router.get('/mine', verifyToken, getMyItems);

// Delete an item by ID
router.delete('/:itemId', verifyToken, deleteItem);

// Update an item by ID
router.put('/:itemId', verifyToken, updateItem);

module.exports = router;