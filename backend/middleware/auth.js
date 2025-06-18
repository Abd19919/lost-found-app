const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const parts = token.split('-');
  const userId = parts[0];
  const role = parts[2] || 'user';

  if (!userId || isNaN(userId)) {
    return res.status(403).json({ error: 'Invalid token format' });
  }

  req.user = { user_id: parseInt(userId), role };
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { verifyToken, authorizeAdmin };