const mongoose = require('../index');

const StudentSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    
    test: [{
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Test'
    }],

    points:{
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

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student