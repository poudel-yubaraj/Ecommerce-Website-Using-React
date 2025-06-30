const {signUp,login} = require('../controller/userController')
const express = require("express");
const router = express.Router();
router.post('/signup',signUp);// creating API for a new users
router.post('/login',login)
module.exports = router