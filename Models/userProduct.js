const mongoose=require("mongoose")

const schema=mongoose.Schema({
    "name":{type:String,require:true},

    "description":{type:String,require:true},
    "image":{type:String,require:true},
    "price":{type:Number,require:true},
    "quantity":{type:Number,require:true},
    "userId":{type:String,require:true}
})
const userProduct=mongoose.model("userproducts",schema)
module.exports={userProduct}