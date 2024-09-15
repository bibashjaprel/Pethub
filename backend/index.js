const express = require('express')
const app = express()
const connectDB = require('./dbconfig/dbconfig.js')
connectDB()
require('dotenv').config()
const PORT = process.env.PORT

const userRoutes = require('./routes/user.routes.js')
const petRoutes = require('./routes/pet.routes.js')

app.get('/login',(req, res)=>{
  res.send("Hello I'm Login Page")
})

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/pet', petRoutes);

app.listen(PORT, ()=>{
  console.log(`I am Live at ${PORT}`)
})
