var jwt = require('jsonwebtoken');

const auth=async(req,res,next)=>{
const token=req.headers.authorization
if(token){
  
    try{
        jwt.verify(token.split(" ")[1], 'sonu',(err, decoded)=> {
       
         if(decoded){
    


req.body.userId=decoded.authorId
next()


          }else{
            res.status(400).send({"msg":"something going wrong"})
          }
          })}catch(err){
        res.status(400).send({msg:"something going wrong"})
    }
}else{
    res.status(400).json({msg:"Please login first"})
}





}
module.exports={auth}