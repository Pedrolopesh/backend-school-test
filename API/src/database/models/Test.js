const mongoose = require('../index');

const TestSchema = new mongoose.Schema({

    name: {
        type: String,
        require: false,
    },
    
    student_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],

    question_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest'
    }],

    grade:{
        type: Number,
        require: false,
    },

    createdAt: {
        type: Date,
        default:Date.now,
    },

}, {
    timestamps: true,
    versionKey: false
})

const Test = mongoose.model('Test', TestSchema)

module.exports = Test