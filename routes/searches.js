const { Router } = require('express');

const { getAll } = require('../controllers/searches');
const { validator } = require('../middlewares/validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/:search', jwtValidator, getAll);

module.exports = router;
