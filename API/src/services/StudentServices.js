const Student = require("../database/models/Student")

module.exports = {
    async findStudentByName(student_name){
        let studentQuery = Student.find({ name: student_name }).select('+points')
        if(studentQuery == null) return false
        else return studentQuery
    },

    async calculateStudentAverage(student_data){
        console.log(student_data[0].points.length)
        return student_data
    }
}