const router = require('express').Router();
const authController = require('../controllers/auth');

//SIGN UP
router.post('/signup', authController.signup);

//SIGN IN
router.post('/signin', authController.signin);

//GOOGLE AUTH
router.post('/google', authController.googleAuth);

module.exports = router;
