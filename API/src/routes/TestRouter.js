const express = require('express');
const router = express.Router();

const TestController = require('../controllers/TestController');

router.route('/create/test').post(TestController.create);
/**
 * @swagger
 * /findAll/tests:
 *   get:
 *     description: Grant that sever is runing
 *     response:
 *      200:
 *      description: A successful response
 */
router.route('/findAll/tests').get(TestController.findAllTests);
router.route('/find/test/:id').get(TestController.findById);



module.exports = router;