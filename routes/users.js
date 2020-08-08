const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser } = require('../controllers/users');
const { validator } = require('../middlewares/validator');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validator,
  ],
  createUser
);

module.exports = router;
