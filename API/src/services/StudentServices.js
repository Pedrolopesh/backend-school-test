const Student = require("../database/models/Student")
const Test = require("../database/models/Test")

module.exports = {
    async findStudentByName(student_name){
        let studentQuery = Student.find({ name: student_name }).select('+points')
        if(studentQuery == null) return false
        else return studentQuery
    },

    async calculateStudentAverage(student_data){
        let studentTestQuery = await Test.find({ student_id: student_data[0]._id})
        console.log(studentTestQuery.length)
        console.log(student_data[0].points.length)
        let result = (studentTestQuery.length * student_data[0].points.length) / studentTestQuery.length
        if(result == ''){ return false}
        else return result
    }
}