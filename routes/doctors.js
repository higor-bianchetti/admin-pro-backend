const { Router } = require('express');
const { check } = require('express-validator');

const { validator } = require('../middlewares/validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctors');

const router = Router();

router.get('/', getDoctors);

router.post(
  '/',
  [
    jwtValidator,
    check('name', 'Doctor name is required').not().isEmpty(),
    validator,
  ],
  createDoctor
);

router.put('/:id', [], updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports = router;
