const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
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

router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('role', 'Role is required').isEmail(),
  ],
  updateUser
);

router.delete('/:id', deleteUser);

module.exports = router;
