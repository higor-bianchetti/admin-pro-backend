const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
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

module.exports = router;
