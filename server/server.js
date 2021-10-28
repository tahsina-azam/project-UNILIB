const express = require('express');
const cors =require('cors');
const bcrypt =require('bcryptjs');
const jwt= require('jsonwebtoken')
const { faRetweet } = require('@fortawesome/free-solid-svg-icons');
const cookieParser = require('cookieparser')
const connectDB = require('./db/db_user')
const User = require('./model/model_user')
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './config.env') })


const app = express();

connectDB();

app.use(cors( {
    credentials: true,
    origin: ['http://localhost:3000']
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/userinfo',(req,res)=>{
   res.send('list of all task')
})

app.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        registration: req.body.registration,
        department:req.body.department,
        session:req.body.session,
        password: hashedPassword,
    })

    const result = await user.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)
})


app.listen(4000,()=>{
    console.log('running on port 4000');
})

module.exports = app;