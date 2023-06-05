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
        var token = jwt.sign({authorId:data._id}, 'sonu',{ expiresIn: 60 * 60 });
        res.cookie("usertoken",token,{
            httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    secure: true, // Cookie can only be transmitted over HTTPS
    sameSite: 'strict', // Cookie is only sent in first-party context
    maxAge: 86400000, // Expiration time in milliseconds (1 day)
    path: '/', // Cookie is accessible from all paths
        })
        res.status(200).json({msg:"Login Successfully","token":token,"username":data.name})
      }else{
        res.status(400).send({"msg":"!Please Check Your Password"})
      }
    });
}else{
    res.status(400).json({msg:"Oops No data found!!"})
}





})



module.exports={userRouter}
