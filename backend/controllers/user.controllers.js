const User = require('../models/user.models.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const createToken = (user) => {
  return jwt.sign({ _id: user._id, role:user.role }, process.env.SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user);
    res.status(200).json({
      email: user.email,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
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
    const token = createToken(user);
    res.status(200).json({
      email: user.email,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// user controllers
const getUsers = async (req ,res) =>{
  const users = await User.find({}).sort({createdAt: -1})
  res.status(200).json(users)
}

// get single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such User' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'No such User' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

//deleteuser
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such User' });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'No such User' });
    }
    console.log('user deleted sucessfully')

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}



module.exports = { loginUser, signupUser, getUsers, getUser, deleteUser};
