const rolevalider=(req,res,next)=>{
    const {role}=req.user
    if (role != "admin") {
        res.status(400).json({ message: "You not authorise to access " })
    }
    else{
        next()
    }
}

module.exports=rolevalider