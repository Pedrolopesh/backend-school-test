const express = require('express');
const router = express.Router();

const QuestController = require('../controllers/QuestController')

router.route('/create/question').post(QuestController.create);
router.route('/answer/question').patch(QuestController.studentAnswer);
router.route('/findAll/questions').get(QuestController.findAllQuestions);
router.route('/find/question/:id').get(QuestController.findById);

module.exports = router;