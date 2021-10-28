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

app.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    console.log(req.body);
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
     console.log("success");
    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    })
})


app.listen(4000,()=>{
    console.log('running on port 4000');
})

module.exports = app;