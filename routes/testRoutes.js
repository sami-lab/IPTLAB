const express = require('express');

const testController = require('../Controllers/testController');

const router = express.Router();

router.route('/').get(testController.getAll).post(testController.createOne);
router
  .route('/:id')
  .get(testController.getOne)
  .patch(testController.update)
  .delete(testController.delete);
module.exports = router;
