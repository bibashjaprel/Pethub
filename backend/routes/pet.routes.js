const express = require('express')
const router = express.Router();

router.get('/pets', (req, res)=>{
  res.send("all pets")
})

module.exports = router;
