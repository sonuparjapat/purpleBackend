const mongoose=require("mongoose")

const schema=mongoose.Schema({
    "ratings":String,
    "ratingcount":String,
    "type":String,
    "img":String,
    "productbrand":String,
    "product-price":String,
    "product-sizeButton":String,
    "price":String,
    "product-discountPercentage":Number,
    "id":Number,
    "range":String,
    "discountrange":String,
    "quantity":Number,
    "userId":{type:String,require:true}
})
const userProduct=mongoose.model("userproducts",schema)
module.exports={userProduct}