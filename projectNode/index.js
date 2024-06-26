import express from "express";
import {config} from "dotenv";
import cors from "cors";

import {connectToDB} from "./config/dbConfig.js";
import {errorHandling} from "./midddlwares/errorHandlingMiddleware.js";
import {router} from "./routes/user.js";
import {routerp} from "./routes/product.js";
import{routero} from "./routes/order.js"
//////


const app=express();
config();
connectToDB();
app.use(cors());
app.use(express.json());
app.use("/api/products",routerp);
app.use("/api/users",router);
app.use("/api/orders",routero);
app.use(errorHandling);


let port=process.env.PORT||3500;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})