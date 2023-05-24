const express=require('express')

const {userProduct}=require("../Models/userProduct")
const productRouter=express.Router()
productRouter.get("/userproduct",async(req,res)=>{
// console.log(await userProduct.find({"userId":req.body.userId}))
// console.log(req.body)
    try{
        const data=await userProduct.find({"userId":req.body.userId})
        res.status(200).json({msg:"success","data":data})
    }catch(err){
        res.status(400).send({msg:"something Going Wrong"})
    }
})
productRouter.post("/add",async(req,res)=>{
    // console.log(await userProduct.find({"userId":req.body.userId}))
    // console.log(req.body)
    const data=await userProduct.findOne(req.body)
    if(data){
        res.status(400).json({"msg":"Product is Already in Cart","type":"error"})
    }
    else{

    
        try{
            const data=new userProduct(req.body)
            await data.save()
            res.status(200).json({msg:"Product added to cart","type":"success"})
        }catch(err){
            res.status(400).send({msg:"something Going Wrong"})
        }}
    })
productRouter.patch("/userproduct/:id",async(req,res)=>{
    // console.log(await userProduct.find({"userId":req.body.userId}))
    // console.log(req.body)
    const {id}=req.params
    const  userdata=await userProduct.findOne({"_id":id})
    if(
        req.body.userId!==userdata.userId
    ){
        res.status(400).json({"msg":"error","data":"You are not authorised to do this "})
    }else{
        try{
            await userProduct.findByIdAndUpdate({"_id":id},req.body)
            res.status(200).send({"msg":"success","data":"updated successfully"})
        }catch(err){
            res.status(400).send({"msg":"error","data":"something going wrong"})
        }
       
    }
     
    })
    productRouter.delete("/userproduct/:id",async(req,res)=>{
        // console.log(await userProduct.find({"userId":req.body.userId}))
        // console.log(req.body)
        const {id}=req.params
        const  userdata=await userProduct.findOne({"_id":id})
        if(
            req.body.userId!==userdata.userId
        ){
            res.status(400).json({"msg":"error","data":"You are not authorised to do this "})
        }else{
            try{
                await userProduct.findByIdAndDelete({"_id":id})
                res.status(200).send({"msg":"success","data":"deleted successfully"})
            }catch(err){
                res.status(400).send({"msg":"error","data":"something going wrong"})
            }
           
        }
         
        })
productRouter.post("/post",async(req,res)=>{
const{name,description,image,quantity,price}=req.body

const data=await userProduct.findOne(req.body)
// console.log(data)
if(data){
    res.status(400).json({"msg":"Product is already in your cart"})
}else{


    try{
       const data=new userProduct(req.body)
       await data.save()
       res.status(200).json({msg:"Product added to cart"})
         }catch(err){
        res.status(400).json({msg:err})
    }}

})





module.exports={productRouter}
