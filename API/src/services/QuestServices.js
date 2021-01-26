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

    async checkStudentAnwer(student_id, quest_id) {
        if(!student_id){
            return 'error student_id is empty'
        }else{
    
            let macthPoint = await Quest.findById({ _id: quest_id }).select('+correct_answer')
            let newArray = []
            
            newArray.push(macthPoint)
            let filtered = await newArray[0].student_answer.filter((item) => { return item.student_id == student_id })
            
            if(filtered == null || filtered == '')
                return false
    
            else if(filtered[0].option == macthPoint.correct_answer)
                return true
            else
                return false
        }
    }
    
}