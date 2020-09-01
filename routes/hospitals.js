const { Router } = require('express');
const { check } = require('express-validator');

const { validator } = require('../middlewares/validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require('../controllers/hospitals');

const router = Router();

router.get('/', getHospitals);

router.post(
  '/',
  [
    jwtValidator,
    check('name', 'Hospital name is required').not().isEmpty(),
    validator,
  ],
  createHospital
);

router.put(
  '/:id',
  [
    jwtValidator,
    check('name', 'Hospital name is required').not().isEmpty(),
    validator,
  ],
  updateHospital
);

router.delete('/:id', deleteHospital);

module.exports = router;
