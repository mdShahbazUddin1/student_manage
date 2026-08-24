const express = require("express")
const { getAllStudent, createStudent, loginStudent, updateStudent, deleteStudent } = require("../controller/student.controller")
const studentRouter = express.Router()



studentRouter.get("/getAllStudent",getAllStudent)
studentRouter.post("/createStudent",createStudent)
studentRouter.post("/login",loginStudent)
studentRouter.put("/update/:id",updateStudent)
studentRouter.delete("/delete/:id",deleteStudent)



module.exports = studentRouter