const Rolechecker=(req,res,next)=>{
    const role=req.user.role
    if(role!="Admin"){
        return res.status(400).json({message:"You Are Not Authorised To Access"})
    }
    else{
        next();
    }
    

}

module.exports=Rolechecker