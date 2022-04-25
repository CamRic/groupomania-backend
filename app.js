const express = require('express')
const sequelize = require('./models/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

// routes objects
const userRoutes = require('./routes/user.routes')
const topicRoutes = require('./routes/topic.routes')
const postRoutes = require('./routes/post.routes')

// app
const app = express()

// connect to db
console.log("checking connection to db...")
try {
    sequelize.authenticate()
    console.log('Connected to db!')
} catch (error) {
    console.log('Can\'t connect to db...')
    console.log(error)
    process.exit(1)
}


// set headers
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
//     next()
// })

app.use(cors())

// request?
app.use((req, res, next) => {
    console.log('request received!')
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// images
app.use('/api/topic/images', express.static(path.join(__dirname, 'images')))

// routes
app.use('/api/user', userRoutes)
app.use('/api/topic', topicRoutes)
app.use('/api/post', postRoutes)

module.exports = app