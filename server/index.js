require('dotenv').config()
const express = require('express')
const ctrl = require('./controller')
const app = express()
const massive = require('massive')
const {CONNECTION_STRING} = process.env

app.use(express.json())

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('db connected')
})

const port = 4040

// auth endpoints
app.post('/auth/register', ctrl.registerUser)
app.post('/auth/login', ctrl.login)

app.get('/api/posts', ctrl.getPosts)

app.listen(port, console.log(`Running on ${port}`))

