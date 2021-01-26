const Student = require('../database/models/Student');
const { findStudentByName, calculateStudentAverage } = require('../services/StudentServices');

module.exports = {
    async create(req, res){

        const { name } = req.body
        
        if(!name){
            return res.status(400).send({ success: false, message: 'Please fill in all fields' })
        }

        const student = await Student.findOne({name: name})
        if(student == null){

            const newStudent = new Student({
                name,
            })
    
            
            await newStudent.save()
    
            .then(doc =>{
                return res.status(201).send({
                    success: true,
                    student: doc
                })
            })
            .catch(err => {
                return res.status(400).send(err)
            })

        }else{
            return res.status(401).send({
                success: false,
                message: 'student alredy created',
                student: student
            })
        }
        // // const testFindResult = Test.findById(id)
        // // console.log(testFindResult)
        
    },

    findById(req, res){
        const id = req.params.id;

        Student.findById(id, function (err, doc) {

            if (err) {
                console.log(err)
                return res.send({ success: false, error: err })
            }
            return res.send({ success: true, doc:doc })

        })
    },

    findByName(req, res){
        const name = req.query.name;

        Student.find({name:name}, function (err, doc) {

            if (err) {
                console.log(err)
                return res.send({ success: false, error: err })
            }
            return res.send({ success: true, doc:doc })


        })
    },

    findAllSutends(req, res){
        Student.find((err, docs) => {
            if (err) return res.send(err)
            return res.send({ success: true, doc:docs })
        })
    },

    async calcAverage(req, res){
        const { student_name, test_id } = req.query;

        if(!student_name || !test_id){
            return res.status(400).send({ success: false, message: 'Please fill in all fields' })
        }

        let studentQueryResult = await findStudentByName(student_name)
        if(studentQueryResult == ''){ return res.status(400).send({ success: false, doc: studentQueryResult }) }

        let calcAvarageResult = await calculateStudentAverage(studentQueryResult);
        return res.status(200).send(calcAvarageResult);
    }

}