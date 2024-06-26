import jwt from "jsonwebtoken";

export const generateToken=(user)=>{
    let jwtSecret=process.env.JWT_SECRET;
    let data={
        userName:user.userName,
        _id:user._id,
        role:user.role
    }
    const token=jwt.sign(data,jwtSecret,{expiresIn:'200m'});
    return token;
}