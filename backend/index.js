const express = require('express')
const app = express()
const connectDB = require('./dbconfig/dbconfig.js')
connectDB()
require('dotenv').config()
const PORT = process.env.PORT

app.get('/login',(req, res)=>{
  res.send("Hello I'm Login Page")
})

app.listen(PORT, ()=>{
  console.log(`I am Live at ${PORT}`)
})
