const Item = require('../models/itemModel');

const createItem = async (req, res) => {
  const { title, description, location } = req.body;
  const user_id = req.user?.user_id || req.body.user_id;

  if (!title || !description || !location || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newItem = await Item.createItem({ title, description, location, user_id });
    console.log('Inserted:', newItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.getAllItems();
    res.json(items);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getItemsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await Item.getItemsByUserId(userId);
    res.json(items);
  } catch (err) {
    console.error('GET by user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getMyItems = async (req, res) => {
  const userId = req.user?.user_id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const items = await Item.getItemsByUserId(userId);
    res.json(items);
  } catch (err) {
    console.error('My Items Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const deleted = await Item.deleteItem(itemId);
    if (deleted) {
      console.log(`Deleted item ${itemId}`);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const { title, description, location } = req.body;

  try {
    const updatedItem = await Item.updateItem(itemId, { title, description, location });
    if (updatedItem) {
      console.log(`Updated item ${itemId}`);
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemsByUser,
  getMyItems,
  deleteItem,
  updateItem
};