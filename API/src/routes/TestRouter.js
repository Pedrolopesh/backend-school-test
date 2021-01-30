const express = require('express');
const router = express.Router();

const TestController = require('../controllers/TestController');

router.route('/create/test').post(TestController.create);
router.route('/findAll/tests').get(TestController.findAllTests);
router.route('/find/test/:id').get(TestController.findById);



module.exports = router;