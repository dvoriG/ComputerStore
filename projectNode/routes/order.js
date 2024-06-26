import express from "express";

import {auth,authAdmin} from "../midddlwares/auth.js"
import{getAllOrders,getAllOrdersOfUser,addOrder ,deleteOrder,updateOrderStatus}from "../controllers/order.js"

export const routero=express.Router();

routero.get("/",getAllOrders);//authAdmin
routero.get("/:idUser",auth,getAllOrdersOfUser);
routero.post("/",auth,addOrder);
routero.delete("/idOrder",deleteOrder);//auth
routero.put("/:idOrder",authAdmin,updateOrderStatus);