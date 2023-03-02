const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { response } = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
require('dotenv').config()
require('express-async-errors')

mongoose.set('strictQuery', false)



const mongoUrl = process.env.NODE_ENV === 'test'
    ? process.env.TESTMONGO_URL
    : process.env.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app