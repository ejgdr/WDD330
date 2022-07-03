const express = require('express');
const router = express.Router();

router.use('/', require('./main'));
router.use('/login', require('./login'));
router.use('/results', require('./results'));

module.exports = router;