const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')

const authRouter = require('./router/user')
const courseRouter = require('./router/course')
const globalErrorHandler = require('./controller/errorController')
const appError = require('./utils/appError')
const email = require('./utils/email')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use('/api/v1/user', authRouter)
app.use('/api/v1/course', courseRouter)

app.all(`*`, (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app;