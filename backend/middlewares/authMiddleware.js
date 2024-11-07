const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET); 
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or token expired.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};
