const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate, registerSchema, loginSchema } = require('../middleware/validation.middleware');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
