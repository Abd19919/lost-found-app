const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existing = await User.findUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({ username, email, passwordHash, role: role || 'user' });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = `${user.user_id}-${Date.now()}`;

    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Fetch Users Error:', err);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deleted = await User.deleteUser(userId);
    if (deleted) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, role } = req.body;
  try {
    const updated = await User.updateUser(userId, { username, email, role });
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ error: 'Update failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
};