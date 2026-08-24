const express = require('express');
const connection = require('./config/db');
const studentRouter = require('./routes/student.routes');
const cors = require("cors")
require('dotenv').config()
const PORT = process.env.PORT;
const app = express();
app.use(express.json())
app.use(cors())
app.use("/student",studentRouter)

app.get("/",async(req,res)=>{
    res.status(200).send({msg:"Health"})
})
app.listen(PORT,"0.0.0.0",async()=>{
    try {
        await connection
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
})