import Joi from "joi";
import mongoose from "mongoose";

const userSchema=mongoose.Schema({
   userName:String,
   password:String,
   email: String,
   role:{type:String,default:"user"},
   dateRegistration:{type:Date,default:Date.now()}
})

export const UserModel=mongoose.model("users",userSchema);

export const userValidatorForLogin=(_user)=>{
   const schema =Joi.object({
      userName:Joi.string().min(3).max(30).required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required()
   })
   return schema.validate(_user);
}

export const userValidator=(_user)=>{

   const schema =Joi.object({
      userName:Joi.string().min(3).max(30).required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
      email:Joi.string().email().required()
   })
   return schema.validate(_user);

}