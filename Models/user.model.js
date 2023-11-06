const mongoose = require("mongoose")
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true, validate:(value)=> validator.isEmail(value)},
    password:{type:String,require:true},
    isAdmin:{type:Boolean,default:false},
    createdAt:{type:Date,default:new Date().toString()},
})

const userModel = mongoose.model('user',userSchema)

module.exports={userModel}