const Quest = require('../database/models/Quest');
const Student = require('../database/models/Student');
const Test = require('../database/models/Test');

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
    }
}