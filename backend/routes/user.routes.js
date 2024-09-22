const express = require('express')
const router = express.Router()
const {loginUser,signupUser, getUsers, getUser, deleteUser} = require('../controllers/user.controllers.js')

console.log(getUser)

//auth routes
router.post('/login', loginUser)
router.post('/signup', signupUser)

//user routes
router.get('/users', getUsers)
router.get('/:id', getUser)
router.delete('/delete/:id', deleteUser)


module.exports = router;
