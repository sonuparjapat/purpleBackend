const express=require("express")
const { productRouter } = require("./userProductRoute")
const { allproducts } = require("../Models/AllProducts")
const allproductRoute=express.Router()



allproductRoute.post("/addall",async(req,res)=>{
try{
await allproducts.insertMany(req.body)
res.status(200).send({msg:"products added"})
}catch(err){
    res.status(400).send({msg:"something going wrong"})
}
})
allproductRoute.delete("/deleteall",async(req,res)=>{
    try{
    await allproducts.deleteMany()
    res.status(200).send({msg:"allproducts deleted"})
    }catch(err){
        res.status(400).send({msg:"something going wrong"})
    }
    })
allproductRoute.get("/all",async(req,res)=>{
const {limit,page,range,discountrange,productbrand}=req.query
const allquery={}
if(productbrand){
    allquery.productbrand=productbrand
}
if(range){
  
    allquery.range=range
}
if(discountrange){
    allquery.discountrange=discountrange
}


    const data=await allproducts.find(allquery).skip((page*limit)-limit).limit(limit)
    res.status(200).json({"msg":"success","data":data})
})
allproductRoute.get("/single/:id",async(req,res)=>{
  const {id}=req.params
  
   
    
       try{

        const data=await allproducts.findOne({"_id":id})
        res.status(200).json({"msg":"success","data":data})}catch(err){
            res.status(400).json({"msg":"something going wrong"})
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