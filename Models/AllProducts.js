const mongoose=require("mongoose")

const schema=mongoose.Schema({
    "ratings":String,
"ratingcount":String,
"img":String,
"product-brand":String,
"product-price":String,
"product-sizeButton":String,
"price":String,
"product-discountPercentage":Number,
"id":Number,
"range":String,
"discountrange":String,
"quantity":Number
   
})
const allproducts=mongoose.model("products",schema)
module.exports={allproducts}