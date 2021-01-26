const express = require('express');
const router = express.Router();

const TestController = require('../controllers/TestController')
const StudentController = require('../controllers/StudentController')
const QuestController = require('../controllers/QuestController')

router.get('/index', (req, res) => {
    res.status(200).json({message:'Server is runing'})
    console.log('Server ok')
});

router.route('/create/test').post(TestController.create);
router.route('/findAll/tests').get(TestController.findAllTests);
router.route('/find/test/:id').get(TestController.findById);

router.route('/create/student').post(StudentController.create);
router.route('/findAll/students').get(StudentController.findAllSutends);
router.route('/find/student/:id').get(StudentController.findById);
router.route('/findbyName/student').get(StudentController.findByName);
router.route('/calc/average').get(StudentController.calcAverage);

router.route('/create/question').post(QuestController.create);
router.route('/answer/question').patch(QuestController.studentAnswer);
router.route('/findAll/questions').get(QuestController.findAllQuestions);
router.route('/find/question/:id').get(QuestController.findById);


module.exports = router;