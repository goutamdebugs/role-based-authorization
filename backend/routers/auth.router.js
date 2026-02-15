const express = require('express')
const router = express.Router()

const jwtToken = require('../services/auth.service')
const {signin,signup} = require('../controllers/auth.controllers')

router.post('/signin',signin)
router.post('/signup',signup)

module.exports = router;