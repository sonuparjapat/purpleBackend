
const mongoose=require("mongoose")



const paymentScheme=mongoose.Schema({
 
        "checked":{type:Boolean,require:true}
 
})
const paymentmodel=mongoose.model("paymentchecking",paymentScheme)
module.exports={paymentmodel}