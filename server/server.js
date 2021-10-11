const express = require('express');
const cors =require('cors');
const { faRetweet } = require('@fortawesome/free-solid-svg-icons');
const connection = require('./db1')

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/userinfo',(req,res)=>{
   res.send('list of all task')
})

app.post('/addUser',(req,res)=>{
    const ADD_QUERY = `INSERT INTO infotable (name,email,department,registrationnumber,session,password) 
    VALUES('${req.body.data.name}','${req.body.data.email}','${req.body.data.department}','${req.body.data.registration}','${req.body.data.session}','${req.body.data.password}')`
    //console.log(req.body)
    //res.send('you can add user')
    connection.query(ADD_QUERY,(err)=>{
        if(err) console.log(err)
        else res.send('user has been added')
    })
})

app.listen(4000,()=>{
    console.log('running on port 4000');
})