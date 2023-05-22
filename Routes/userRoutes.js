const express=require('express')
const { userModel } = require('../Models/userModel')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
const{email,name,password}=req.body
const data=await userModel.findOne({"email":email})
console.log(data)
if(data){
    res.status(400).json({msg:"You are already registered"})
}else{
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            const data=new userModel({email,password:hash,name})
await data.save()
res.status(200).send({msg:"Registered Successfully"})
        });


    }catch(err){
        res.status(400).json({msg:err})
    }
}
})
userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
const data=await userModel.findOne({"email":email})
if(data){
    bcrypt.compare(password, data.password, function(err, result) {
      if(result){
        var token = jwt.sign({authorId:data._id}, 'sonu');
        res.status(200).json({msg:"Login Successfully","token":token})
      }else{
        res.status(400).send({"msg":err})
      }
    });
}else{
    res.status(400).json({msg:"Oops No data found!!"})
}





})



module.exports={userRouter}
