const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user' ,'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (
  username,
  email,
  password,
  firstname,
  lastname
) {
  if (!username || !email || !password || !firstname || !lastname) {
    throw new Error('All fields are required!');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error('Email already exists');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw new Error('Username not available');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
      username,
      email,
      password: hash,
      firstname,
      lastname
    });

    return user;
  } catch (error) {
    throw new Error('Error during password hashing: ' + error.message);
  }
};


userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields are required!');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('User not found. Please register first.');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect email or password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
