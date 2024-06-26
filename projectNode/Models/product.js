import mongoose  from "mongoose";

const productSchema=mongoose.Schema({
    productName:String,
    description:String,
    datOfProduction:{type:Date,default:Date.now()},
    picture:String,
    price:Number,
    target:String,
    company:String,
    CPUspeed:String
 
})

export const ProductModel=mongoose.model("produts",productSchema);

export const validateAddProduct=(_product)=>{
    const schema =Joi.object({
       productName:Joi.required(),
    //    price: Joi.number().greater(10).required(),
      
    })
    return schema.validate(_product);
 }