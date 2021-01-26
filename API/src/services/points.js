const Quest = require('../database/models/Quest');
const Student = require('../database/models/Student');


module.exports = async function registerStudentPoints(student_id) {

    const student = await Student.findByIdAndUpdate(student_id,{
        $push: { points: "1" }
    })
    // .then(doc => { return doc })
    .catch(err => { return err })
    return student
    
}