const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');

router.get('/login', loginController.getAll);


module.exports = router;