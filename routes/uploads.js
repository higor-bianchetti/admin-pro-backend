const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { jwtValidator } = require('../middlewares/jwt-validator');
const { fileUpload, getPicture } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:collection/:id', jwtValidator, fileUpload);
router.get('/:collection/:picture', getPicture);

module.exports = router;
