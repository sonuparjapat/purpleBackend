const { auth } = require("./Middlewares/userLoginMiddleware")
const { connection } = require("./Models/userModel")
const { allproductRoute } = require("./Routes/ProductRoute")
const { productRouter } = require("./Routes/userProductRoute")
const { userRouter } = require("./Routes/userRoutes")
const cors=require("cors")
const express=require("express")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.use("/products",allproductRoute)
app.use(auth)
app.use("/userdata",productRouter)
app.listen(8080,async()=>{

   try{
    await connection

    console.log("connected to db")
   }catch(err){
    console.log(err)
   }
   console.log("port is running")







})