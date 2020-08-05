const { Router } = require('express');
const { getUsers } = require('../controllers/users.js');

const router = Router();

router.get('/', getUsers);

module.exports = router;
