const db = require('../db');

const createItem = async ({ title, description, location, user_id }) => {
  const result = await db.query(
    `INSERT INTO items (title, description, location, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, location, user_id]
  );
  return result.rows[0];
};

const getAllItems = async () => {
  const result = await db.query(`SELECT * FROM items`);
  return result.rows;
};

const getItemsByUserId = async (user_id) => {
  const result = await db.query(
    `SELECT * FROM items WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

const deleteItem = async (item_id) => {
  const result = await db.query(
    `DELETE FROM items WHERE item_id = $1 RETURNING *`,
    [item_id]
  );
  return result.rows[0];
};

const updateItem = async (item_id, { title, description, location }) => {
  const result = await db.query(
    `UPDATE items SET title = $1, description = $2, location = $3
     WHERE item_id = $4 RETURNING *`,
    [title, description, location, item_id]
  );
  return result.rows[0];
};

module.exports = {
  createItem,
  getAllItems,
  getItemsByUserId,
  deleteItem,
  updateItem,
};