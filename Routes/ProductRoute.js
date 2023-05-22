const express=require("express")
const { productRouter } = require("./userProductRoute")
const { allproducts } = require("../Models/AllProducts")
const allproductRoute=express.Router()



allproductRoute.post("/addproduct",async(req,res)=>{
try{
await allproducts.insertMany(req.body)
res.status(200).send({msg:"products added"})
}catch(err){
    res.status(400).send({msg:"something going wrong"})
}




})

allproductRoute.patch("/edit",async(req,res)=>{
const {id}=req.params

let data=await allproducts.findOne({"_id":id})
if(data){
    try{
await allproducts.findByIdAndUpdate({"_id":id},req.body)
res.status(200).json({"msg":`data updated with id:-${id}`})
    }catch(err){
        res.status(400).send({"msg":"something going wrong"})
    }
}else{
    res.status(400).json({"msg":"No data found"})
}



})
allproductRoute.delete("/delete",async(req,res)=>{
    const {id}=req.params
    
    let data=await allproducts.findOne({"_id":id})
    if(data){
        try{
    await allproducts.findByIdAndDelete({"_id":id})
    res.status(200).json({"msg":`data deleted with id:-${id}`})
        }catch(err){
            res.status(400).send({"msg":"something going wrong"})
        }
    }else{
        res.status(400).json({"msg":"No data found"})
    }
    
    
    
    })
module.exports={allproductRoute}