const express = require('express');
const router = express.Router();

const resultsController = require('../controllers/results');

router.get('/results', resultsController.getAll);


module.exports = router;