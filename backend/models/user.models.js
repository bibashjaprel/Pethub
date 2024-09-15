const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
  }
}, {timestamps: true})




//static signup method
userSchema.statics.signup = async function (username, email, password, firstname, lastname) {
  if (!username || !email || !password || !firstname || !lastname) {
    throw Error('All fields are required!');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error('Email already exists');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error('Username not available');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    firstname,
    lastname
  });
  console.log(user);
  return user;
};




//static login method
userSchema.statics.login = async function(email, password){
  if(!email || !password){
      throw Error('All fields are required!')
  }
  const user = await this.findOne({email})

  if(!user){
      throw Error('Please register your account ')
  }
const match = await bcrypt.compare(password,user.password)
if(!match){
  throw Error('Incorrect email or password')
}
return user
}


module.exports = mongoose.model("User", userSchema)

