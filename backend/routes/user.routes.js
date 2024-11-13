const express = require('express')
const router = express.Router()
const {loginUser,signupUser, getUsers, getUser, deleteUser} = require('../controllers/user.controllers.js')
const authMiddleware = require('../middlewares/authMiddleware.js');

//auth routes
router.post('/login', loginUser)
router.post('/signup',  signupUser)

//user routes
router.get('/users' , getUsers)
router.get('/:id', authMiddleware, getUser)
router.delete('/delete/:id', authMiddleware, deleteUser)


module.exports = router;
