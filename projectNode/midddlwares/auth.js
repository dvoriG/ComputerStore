import jwt from "jsonwebtoken";

export const auth=async(req,res,next)=>{
    let token=req.headers["access-token"];
    if(!token)
    return res.status(403)
    .json({type:"not authorized",message:"user not authorized"})
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(403)
        .json({type:"not authorized",message:"user not authorized"})
    }
}




export const authAdmin=async(req,res,next)=>{
    let token=req.headers["access-token"];
    if(!token)
    return res.status(403)
    .json({type:"not authorized",message:"user not authorized"});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=decoded;
        if(decoded.role!="ADMIN")
        return res.status(403).send("you are not premmited");
        next();
    }
    catch(err){
        return res.status(403)
        .json({type:"not authorized",message:"user not authorized"});
    }
}