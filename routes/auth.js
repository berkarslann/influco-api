const express = require('express');

const User = require('../models/user');
const Influencer = require('../models/influencer')
const Brand = require('../models/brand')
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


module.exports = router;