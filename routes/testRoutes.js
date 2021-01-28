const express = require('express');

const testController = require('../Controllers/testController');

const router = express.Router();

router.route('/').post(testController.createOne);

module.exports = router;
