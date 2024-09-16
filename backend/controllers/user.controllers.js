const User = require('../models/user.models.js');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Creating a token
    const token = createToken(user._id);

    // Send user data along with token
    res.status(200).json({
      email: user.email,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  try {
    const user = await User.signup(username, email, password, firstname, lastname);

    // Creating a token
    const token = createToken(user._id);

    // Send user data along with token
    res.status(200).json({
      email: user.email,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
