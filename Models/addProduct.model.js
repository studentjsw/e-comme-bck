const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName:{type:String,require:true},
    description:{type:String,require:true}, 
    price:{type:Number,require:true},
    image:{type:String,require:true},
    category:{type:String,require:true},
    subCategory:{type:String,require:true},
    cartItem:{type:Boolean,default:false},
    createdAt:{type:Date,default:new Date().toString()},
})

const productModel = mongoose.model('product',productSchema)

module.exports={productModel}