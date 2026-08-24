const express = require("express")
const studentModel = require("../models/student.model")
// const studentRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config()

const getAllStudent = async(req,res) => {
    try {
        const student = await studentModel.find()
        if(student.length === 0 ) return res.status(404).send({msg:"No student found"})

            res.status(200).send({msg:"Student found",student})
    } catch (error) {
        res.status(503).send({msg:error.message})
    }

}


const createStudent = async(req,res) => {
    // console.log("BODY:", req.body);
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) return res.status(400).send({msg:"All field are required"})
            const checkUser = await studentModel.findOne({email})
        if(checkUser) return res.status(401).send({msg:"Email Already Exists"})
            const hasPass = await bcrypt.hash(password,10)
            const user = new studentModel({name,email, password:hasPass})
            await user.save()

            res.status(201).send({msg:"Student Created", student:user})
    } catch (error) {
        res.status(503).send({msg:error.message})
    }
}

const loginStudent = async(req,res) =>{
    try {
        const {email, password} = req.body

        const checkUser = await studentModel.findOne({email})
        if(!checkUser) res.status(401).send({msg:"Student not found Please register to login"})

            const passwordValidate = await bcrypt.compare(password, checkUser.password)

            if (!passwordValidate) {
                return res.status(401).send({
                    msg: "Invalid password"
                });
            }

            const token = await jwt.sign(
                {id:checkUser._id},
               process.env.SIGNATURE,
               {expiresIn:"1d"}
            )

            res.status(200).send({msg:"Login Success",token})
    } catch (error) {
        res.status(503).send({msg:error.message})
    }
}


const updateStudent = async(req,res) => {
    try {
        const {name,email} = req.body;
       const {id} = req.params
        const user = await studentModel.findByIdAndUpdate(
            id,
            {name,email},
            {new : true}
        )

        if (!user) {
            return res.status(404).send({
                msg: "Student not found"
            });
        }

        res.status(200).send({
            msg: "Student updated successfully",
            student: user
        });
    } catch (error) {
        res.status(500).send({
            msg: error.message
        });
    }
}

const deleteStudent = async(req,res) => {
    try {
        const {id} = req.params;

        const user = await studentModel.findByIdAndDelete(id);

        if(!user)return res.status(401).status({msg:"Student not found"})

            res.status(200).send({msg:"Student deleted"})
    } catch (error) {
        res.status(500).send({
            msg: error.message
        });
    }
}



module.exports = {
    getAllStudent,
    createStudent,
    loginStudent,
    updateStudent,
    deleteStudent
}