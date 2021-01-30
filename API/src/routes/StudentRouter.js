const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/StudentController')

router.route('/create/student').post(StudentController.create);
router.route('/findAll/students').get(StudentController.findAllSutends);
router.route('/find/student/:id').get(StudentController.findById);
router.route('/find/student').get(StudentController.findByName);
router.route('/calc/average').get(StudentController.calcAverage);


module.exports = router;