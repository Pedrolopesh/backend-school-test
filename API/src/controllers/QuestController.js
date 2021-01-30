const Quest = require('../database/models/Quest');
const Student = require('../database/models/Student');
const Test = require('../database/models/Test');

const registerStudentPoints = require('../services/points')

const { checkStudentidAtTest } = require('../services/TestServices')
const { checkAlredyAnswer, checkStudentAnswer } = require('../services/QuestServices')

module.exports = {
    async create(req, res){
        const { name, test_id, message, options, correct_answer} = req.body
        
        if(!name || !test_id, !message || !options || !correct_answer){
            return res.status(400).send({
                success: false,
                message: 'Please fill in all fields'
            })
        }

        const test = await Test.findById({_id: test_id})
        if(test == null){
            return res.status(400).send({ success: false, message: 'Test not found' })
        }else{
            const newQuest = new Quest({
                name,
                test_id,
                message,
                options,
                correct_answer
            })
            
            await newQuest.save()
            .then(async doc =>{
                
                let test_id = test._id
                let updatedTest = await Test.findByIdAndUpdate(test_id, {
                    $push: { question_id: doc._id }
                }).catch(err => { return res.status(400).send({success: false, error: err}) })
                
                if(updatedTest != ''){ return res.status(201).send({ success: true, message: "success to create Question", doc: doc }) }
            })
            .catch(err => {
                return res.status(400).send(err)
            })
        }
    },

    async studentAnswer(req, res){
        const {test_id, quest_id, student_id, student_answer} = req.body
        
        if(!quest_id || !test_id, !student_id || !student_answer){
            return res.status(400).send({ success: false, message: 'Please fill in all fields' });
        }

        let quest = await Quest.findById({_id: quest_id}).catch(err => { return res.status(400).send({ success: false, error: err}) })
        let test = await Test.findById({_id: test_id}).catch(err => { return res.status(400).send({ success: false, error: err}) })
        let student = await Student.findById({_id: student_id}).catch(err => { return res.status(400).send({ success: false, error: err}) })

        if(!quest)
            return res.status(400).send({ success: false, message: 'Quest not found', doc: quest })
        else if (!test)
            return res.status(400).send({ success: false, message: 'Test not found', doc: test })
        else if (!student)
            return res.status(400).send({ success: false, message: 'Student not found', doc: student })
            
        else{
            
            // CHECK IF USER ALREDY THE CURRENT ANSWER
            let alredyAnswer = await checkAlredyAnswer(student_id, quest_id)
            if(alredyAnswer){return res.status(400).send({ success: false, message: "Student alerdy answer this question" })}
            
            
            // REGISTER STUDENT ANSWER
            let newStudent_answer = { option: student_answer, student_id:student._id }

            Quest.findByIdAndUpdate(quest_id, {
                $push: { student_answer: newStudent_answer, student_id:student._id}
            })
            .then(async doc =>{

                // CHECK STUDENT ANSWER IS CORRECT
                let answersCorrect = await checkStudentAnswer(student_answer, quest_id)
                if(answersCorrect){
                    // REGISTER STUDENT 
                    let registerPoints =  await registerStudentPoints(student_id)
                    res.status(201).send({ success: true,message: "student's right answer", doc: registerPoints })
                }
                else if(!answersCorrect)
                    return res.status(200).send({ success: true, message: "student's wrong answer", doc: doc})

            })
            .catch(err => {
                return res.status(400).send(err)
            })

        }
    },

    async findAllQuestions(req, res){
        Quest.find((err, doc) => {
            if (err) return res.send({success: false, error:err})
            else res.send({ success: true, doc:doc })
        })
    },

    findById(req, res){
        const id = req.params.id;

        Quest.findById(id, function (err, doc) {

            if (err) {
                return res.send({ success: false, error: err })
            }
            return res.send({ success: true, doc:doc })

        })
    },
}