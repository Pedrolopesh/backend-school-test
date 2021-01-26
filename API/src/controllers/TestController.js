const Test = require('../database/models/Test');
const { checkStudentLink } = require('../services/TestServices');

module.exports = {
    async create(req, res){

        const { name, student_id } = req.body
        
        if(!name || !student_id){
            return res.status(400).send({ success: false, message: 'Please fill in all fields' })
        }

        let createdTest = await Test.findOne({name: name})

        if(createdTest == null){

            const newTest = new Test({ name })
            await newTest.save()
            .then(async doc =>{
                let studentLink = await checkStudentLink(student_id, doc)
                console.log(studentLink);
                if(studentLink != '') return res.status(201).send({ success: true, message:"success to create test", doc: studentLink })
                else return res.status(401).send({ success: false, message:"error on create Test" })
            })
            .catch(err => {
                return res.status(400).send({ success: false, error: err})
            })

        }else{
            return res.status(401).send({ success: false, message: 'Test alredy created', doc: createdTest })
        }
    },

    async findAllTests(req, res){
        Test.find((err, doc) => {
            if (err) return res.send({success: false, error:err})
            else res.send({ success: true, doc:doc })
        })
    },

    async findById(req, res){
        const id = req.params.id;

        Test.findById(id, function (err, doc) {
            if (err) return res.send({success: false, error:err})
            else res.send({ success: true, doc:doc })
        })
    },
}