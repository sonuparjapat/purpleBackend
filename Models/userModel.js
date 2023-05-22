const mongoose=require("mongoose")
require('dotenv').config()

const connection=mongoose.connect(process.env.MongoUrl)
const schema=mongoose.Schema({
    "name":{type:String,require:true},

    "email":{type:String,require:true},
    "password":{type:String,require:true}
})
const userModel=mongoose.model("purple",schema)
module.exports={userModel,connection}