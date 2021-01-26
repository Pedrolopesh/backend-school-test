const Quest = require('../database/models/Quest');
const Student = require('../database/models/Student');
const Test = require('../database/models/Test');
const { checkTestAnswer } = require('./QuestServices')
module.exports= {
    async checkStudentidAtTest(student_id, test_id){
        ////SEACRH TO CHECK IF THE STUDENT ALREDY DONE THIS TEST
        let studentTest = await Test.findById({_id: test_id}).populate('student_id')
        let filtered = studentTest.student_id.filter((item) => { return item._id == student_id})
        
        if(filtered == null || filtered == ''){

            ////PUT THE STUDENT AT TEST MODEL
            let updateTest = await Test.findByIdAndUpdate({_id: test_id}, {
                $push: { student_id: student_id }
            })

            ////PUT THE TEST AT STUDENT MODEL
            let updateStudent = await Student.findByIdAndUpdate(student_id, {
                $push: { test: test_id }
            })

            if(updateStudent != '' && updateTest != '') return true
            else return false
            
        }else{
            return false
        }

    },

    ////SHOULD CHECK IF STUDENT IS LINKED WITH A TEST
    async checkStudentLink(student_id, createdTestData){

        let studentLink = await Student.findById({_id: student_id})
        let studentTestLink = await Test.findById({_id: createdTestData._id})

        if(studentLink != null && studentTestLink != ''){
            let updatedTest = await Test.findByIdAndUpdate({_id: createdTestData._id}, {
                $push: { student_id: student_id }
            })

            let updatedStudent = await Student.findByIdAndUpdate({_id: student_id}, {
                $push: { test: createdTestData._id }
            }).catch(err => { return err })
            
            return { update_data: updatedStudent,updatedTest }
        }
    },

    async updateStudentTest(student_answer, student_id, quest_id, test_id){
        let questQuery = await Quest.findById({ _id: quest_id }).select('+correct_answer')
        console.log(questQuery.correct_answer)

        
        let points = []

        let answersCorrect = await checkTestAnswer(student_answer, quest_id)
        if(!answersCorrect){ console.log("wrong: win 0")}
        else { points.push(1) }

        let newStudentTestData = {
            quest_id: quest_id,
            student_id: student_id,
            student_answer: student_answer,
            correct_answer: questQuery.correct_answer,
            points: points
        }

        let studenTestQuesry = await Test.findOne({ student_id: student_id})
        
        // const student = await Test.findByIdAndUpdate(test_id,{ $push: { points: "1" } })

        return studenTestQuesry
    }
}