const db = require('../db');

// Create new user
const createUser = async ({ username, email, passwordHash, role }) => {
  const result = await db.query(
    `INSERT INTO users (username, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id, username, email, role`,
    [username, email, passwordHash, role]
  );
  return result.rows[0];
};

// Find user by email (for login, validation)
const findUserByEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

// Get all users (admin only)
const getAllUsers = async () => {
  const result = await db.query(
    `SELECT user_id, username, email, role FROM users ORDER BY user_id`
  );
  return result.rows;
};

// Update user info by ID
const updateUser = async (userId, { username, email, role }) => {
  const result = await db.query(
    `UPDATE users 
     SET username = $1, email = $2, role = $3 
     WHERE user_id = $4 
     RETURNING user_id, username, email, role`,
    [username, email, role, userId]
  );
  return result.rows[0];
};

// Delete user by ID
const deleteUser = async (userId) => {
  const result = await db.query(
    `DELETE FROM users WHERE user_id = $1 RETURNING user_id`,
    [userId]
  );
  return result.rowCount > 0;
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};