const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const UserRoute=require('./Routes/UserRoute');
const connection = require('./Config/db');
const TaskRoute = require('./Routes/TaskRoute');
const app=express();
app.use(cors({
    origin : ["http://localhost:3000"],
    credentials: true
}))

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome');
})

app.use('/user',UserRoute);
app.use('/task',TaskRoute);

app.listen(8080,async ()=>{
try {
    await connection;
    console.log('started port');
} catch (error) {
    console.log(error);
}
})