const jwt = require('jsonwebtoken');
const Users = require("../models/User");

// Middleware to verify JWT token and admin role
async function verifyAdmin(req, res, next) {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Check if user exists
    const user = await Users.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Attach user object to request
    req.user = user;
    // Check if user's role is admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden, user is not an admin' });
    }

    // Proceed to next middleware
    next();

  } catch (e) {
    console.error(e);
    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Middleware to verify JWT token (without role check)
async function verifyToken(req, res, next) {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];

  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user exists
    const user = await Users.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user object to request
    req.user = user;

    // Proceed to next middleware
    next();

  } catch (e) {
    console.error(e);
    if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { verifyToken, verifyAdmin };
