
const validateRole=(req,res,next)=>{
    const permissions=["farmer","user","User","Farmer"];
    return ()=>{
        const userRole=req.body.role;
        console.log(userRole)
        if(permissions.includes(userRole)){
           return next();
        }else{
            return res.status(401).json("This can only be done by admin");
        }
    }


}
module.exports={validateRole}