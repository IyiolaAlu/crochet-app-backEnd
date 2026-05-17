const express = require('express')
const { signUp, login, logout, me } = require('../controllers/userController')
const requireAuth = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', requireAuth, me)

module.exports = router