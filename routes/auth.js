const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleLogin, renewToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { validator } = require('../middlewares/validator');

const router = Router();

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validator,
  ],
  login
);

router.post(
  '/google',
  [check('token', 'Google token is required').not().isEmpty(), validator],
  googleLogin
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
