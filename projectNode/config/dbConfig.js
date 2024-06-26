import mongoose from "mongoose";

export const connectToDB=async()=>{
    try{
        let con =await mongoose.connect(process.env.DB_CONNECTION);
        // let con =await mongoose.connect("mongodb://0.0.0.0:27017/digitalShop")
        console.log("mongoDB connected successfully!",con.connection.host)
    }
    catch(err){
console.log("cannot connect mongoDB");
console.log(err);
process.exit(1);
    }
}