const Quest = require('../database/models/Quest');
const Student = require('../database/models/Student');

module.exports = {
    async  checkAlredyAnswer(student_id, quest_id){
        
        let quest = await Quest.findById({ _id: quest_id }).populate('student_id')
        let studentsAswered = quest.student_id
        let filtered = studentsAswered.filter((item) => { return item._id == student_id})

        if(filtered == ''){
            return false
        }else{
            return true
        }

    },

    async checkStudentAnswer(student_answer, quest_id) {
        if(!student_answer){
            return 'error student_answer is empty'
        }else{
    
            let macthPoint = await Quest.findById({ _id: quest_id }).select('+correct_answer')
    
            if(student_answer == macthPoint.correct_answer)
                return true
            else
                return false
        }
    }
    
}