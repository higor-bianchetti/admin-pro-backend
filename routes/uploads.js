const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { jwtValidator } = require('../middlewares/jwt-validator');
const { fileUpload } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:collection/:id', jwtValidator, fileUpload);

module.exports = router;
