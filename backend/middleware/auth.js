// middleware/auth.js

// Token verification for all users
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const userId = token.split('-')[0]; // Simple mock decoding
  if (!userId) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  req.user = { user_id: parseInt(userId) }; // Attach user ID
  next();
};

// Admin-only access check
const authorizeAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const role = token.startsWith('1-') ? 'admin' : 'user'; // Simulated admin check

  if (role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  req.user = { role };
  next();
};

module.exports = { verifyToken, authorizeAdmin };