const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true}
},{
    versionKey:false,
    timeStamp:true
})


const studentModel = mongoose.model("Student",studentSchema)

module.exports = studentModel