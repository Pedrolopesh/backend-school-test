const express = require('express');
const router = express.Router();

const studentRouters = require('./StudentRouter')
const testRouters = require('./TestRouter')
const questRouters = require('./QuestRouter')

/**
 * @swagger
 * /index:
 *   get:
 *     description: Grant that sever is runing
 *     response:
 *      200:
 *      description: A successful response
 */
router.get('/index', (req, res) => {
    res.status(200).json({message:'Server is runing'})
    console.log('Server ok')
});

router.use(studentRouters)
router.use(testRouters)
router.use(questRouters)


module.exports = router;