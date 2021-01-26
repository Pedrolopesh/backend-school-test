const mongoose = require('../index');

const QuestSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    
    test_id: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Test'
    }],

    student_id: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Student'
    }],

    message: {
        type: String,
        require: true,
    },

    options:{
        type: Object,
        require: true,
        enum: [{
            option: ['A','B','C','D','E'], 
            content: String
        }]
    },
    
    correct_answer: {
        type: String,
        require: true,
        select: false
    },

    student_answer: {
        type: Array,
        require: true,
    },

    createdAt: {
        type: Date,
        default:Date.now,
    },

}, {
    timestamps: true,
    versionKey: false
})

const Quest = mongoose.model('Quest', QuestSchema)

module.exports = Quest