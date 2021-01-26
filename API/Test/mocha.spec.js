const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

// const app = require('../src/index')
// const request = chai.request(app)
const request = chai.request("http://localhost:3333")

const expect = chai.expect

// QUEST 1 = 60103cfd04ad8d0120c99c97
// QUEST 2 = 60103d1304ad8d0120c99c98

const globalConfig = {
    student_id:'60103bbf59acee267c653473',
    test_id:'60103bff2d88d2131821a3db',
    quest_id:'60103cfd04ad8d0120c99c97',
    studentName:'Unit Test Student numeber: 31'
}

const testConfig = {
    studentName: "Unit Test Student numeber: "+ Math.floor(Math.random() * 100),
    testName: "Test: "+ Math.floor(Math.random() * 5),

    questionBodyRequest:{
        name:"Questão: "+ Math.floor(Math.random() * 10),
        test_id: globalConfig.test_id,
        message:"qual o resultado da expressão matématica: 1 + 1",
        correct_answer: "B",
        options:[
            {option:"A", content:"1"},
            {option:"B", content:"2"},
            {option:"C", content:"3"},
            {option:"D", content:"4"},
            {option:"E", content:"5"}
        ]
    },

    answerQuestionBodyRequest:{
        quest_id:globalConfig.quest_id,
        student_id:globalConfig.student_id,
        test_id:globalConfig.test_id,
        student_answer:"B"
    }

}

// describe('Server', function(){

//     // it('Creating new student', function(){
//     //     expect(1).to.equals(1)
//     //     // console.log("teste")
//     // })

//     it('Must return Server is runing', function(done){
//         request.get('/api/index').end( async function(err, resp){
//             // console.log(resp.body)
//             expect(resp.body.message).to.equals('Server is runing');
//             done();
//         })
//     })


// })


describe('Tests for Student model', function(){
    // it('Must create student', function(done){
    //     request.post('/api/create/student')
    //         .send({ name: testConfig.studentName})
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })

    // it('Should get all created Students', function(done){
    //     request.get('/api/findAll/students')   
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })

    // it('Should calculate Student avarage', function(done){
    //     request.get(`/api/calc/average?student_name=${globalConfig.studentName}&test_id=${globalConfig.student_id}`)
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body).not.to.be.undefined;
    //         // expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })

})

describe('Tests for Test model', function(){
    // it('Should create Test', function(done){
    //     request.post('/api/create/test')
    //         .send({ name: testConfig.testName, student_id: globalConfig.student_id})
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })

    // it('Should get all created tested', function(done){
    //     request.get('/api/findAll/tests')
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         console.log({
    //             test_id: resp.body.doc[0]._id,
    //             student_id: resp.body.doc[0].student[0]
    //         })
    //         expect(resp.body.success).to.equals(true);
    //         expect(resp.body.doc).not.to.be.undefined;
    //         done();
    //     })
    // })

    // it('Should get a test by id', function(done){
    //     request.get(`/api/find/test/${testConfig.testId}`)
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         console.log({
    //             test_id: resp.body.doc._id,
    //             student_id: resp.body.doc.student[0]
    //         })
    //         expect(resp.body.success).to.equals(true);
    //         expect(resp.body.doc).not.to.be.undefined;
    //         done();
    //     })
    // })
})


describe('Tests for Quest model', function(){

    // it('Should create question', function(done){
    //     let body = testConfig.questionBodyRequest
    //     request.post('/api/create/question')
    //         .send(body)
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })

    it('Should answer a question', function(done){
        let body = testConfig.answerQuestionBodyRequest
        request.patch('/api/answer/question')
            .send(body)
            .end( function(err, resp){
            console.log(resp.body)
            // console.log(err)
            expect(resp.body).not.to.be.undefined;
            done();
        })
    })

    // it('Should get all created Questions', function(done){
    //     request.get('/api/findAll/questions')   
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })

    // it('Should get one Question', function(done){
    //     request.get(`/api/find/question/${globalConfig.quest_id}`)   
    //         .end( function(err, resp){
    //         console.log(resp.body)
    //         expect(resp.body.success).to.equals(true);
    //         done();
    //     })
    // })
})