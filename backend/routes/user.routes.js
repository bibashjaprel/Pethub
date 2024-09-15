const express = require('express')
const router = express.Router()

router.post('/login', (req, res)=>{
  res.send("login route")
})

router.post('/signup', (req, res)=>{
  res.send("signup route")
})

module.exports = router;
