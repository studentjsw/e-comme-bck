const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId:{type:String,require:true},
    items:{type:Array,require:true}, 
    totalItem:{type:Number,require:true},
})

const cartModel = mongoose.model('cart',cartSchema)

module.exports={cartModel}