const Course = require('../model/course')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')

exports.addCourse = catchAsync(async(req, res, next) => {
    const course = await Course.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            course
        }
    })
})

exports.getCourse = catchAsync(async(req, res, next) => {
    const course = await Course.find();

    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    })
})

