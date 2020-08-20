const { Router } = require('express');

const { getAll, getDocuments } = require('../controllers/searches');
const { validator } = require('../middlewares/validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/:search', jwtValidator, getAll);
router.get('/collection/:collectionName/:search', jwtValidator, getDocuments);

module.exports = router;
