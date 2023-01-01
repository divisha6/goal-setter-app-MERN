const express = require('express')
const router= express.Router();
const {registerUser, loginUser, getMe} = require('../controllers/userController')

// register
router.post('/', registerUser)

// login
router.post('/login', loginUser)

// retrieve info
router.get('/me', getMe)

module.exports= router;