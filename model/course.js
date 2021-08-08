const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, `Course Name is required`],
    },
}, { timestamps: true })


const Course = mongoose.model('course', courseSchema)

module.exports = Course