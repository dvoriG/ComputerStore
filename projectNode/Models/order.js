import mongoose, {  now }  from "mongoose";
import Joi from "joi";

const minimalProduct=mongoose.Schema({
    productName:String,
    price:Number,
    count:Number
})



const orderSchema=mongoose.Schema({
    orderaDate:{type:Date,default:Date.now()},
    orderTarget:{type:Date,default:Date.now()},
    addressOrder:String,
    // _id:String,
    products:[minimalProduct],
    isExit:Boolean
 })

 export const OrderModel=mongoose.model("orders",orderSchema);


//  export const orderValidator=(_order)=>{
//     const schema=Joi.object({
//         orderaDate:Joi.date().max('now'),
//         userPassword:Joi.string().required(),
//         products:Joi.string().required()
//     });
//     return schema.validate(_order);
//  }


export const orderValidateToAdd = (req_order) => {
    const schema = Joi.object({
        // orderaDate: Joi.date().greater('now').required(),
        // products: Joi.array().items().required()
        addressOrder:Joi.string().min(2)
    })
    
    return schema.validate(req_order);
}

// export { Order, validateProductInOrder, validateAddress, orderValidateToAdd }

