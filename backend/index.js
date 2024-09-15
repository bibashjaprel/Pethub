const express = require('express')
const app = express()
const connectDB = require('./dbconfig/dbconfig.js')
connectDB()
require('dotenv').config()
const PORT = process.env.PORT

const userRoutes = require('./routes/user.routes.js')
const petRoutes = require('./routes/pet.routes.js')

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/pets', petRoutes);

app.listen(PORT, ()=>{
  console.log(`I am Live at ${PORT}`)
})
