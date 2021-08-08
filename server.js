const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

//Connect Database
const DB = process.env.MONGODB_LOCAL_URL
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`DB connect Successfully`)
}).catch(err => {
    console.log(err)
    console.log(`DB connection fail`)
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


