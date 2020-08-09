const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const { validator } = require('../middlewares/validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/', jwtValidator, getUsers);

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

router.put(
  '/:id',
  [
    jwtValidator,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('role', 'Role is required').not().isEmpty(),
    validator,
  ],
  updateUser
);

router.delete('/:id', jwtValidator, deleteUser);

module.exports = router;
