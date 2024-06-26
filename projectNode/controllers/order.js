import mongoose, { isValidObjectId } from "mongoose";
import { orderValidateToAdd } from "../Models/order.js";

// import { Order, validateProductInOrder, validateAddress, orderValidateToAdd, OrderModel } from "../models/order.js";
import { OrderModel } from "../Models/order.js";

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await OrderModel.find({});
        if (!allOrders)
            return res.status(404).json({ type: "NOT FOUND", message: "you don't have orders yet" });
        return res.json(allOrders);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'getAllOrders' function ", message: err.message })
    }
}

export const getAllOrdersOfUser = async (req, res) => {
    try {
        let { userId } = req.user;
        let ordersOfUser = await OrderModel.find({ userId });
        if (ordersOfUser.length == 0)
            return res.status(404).json({ type: "NOT FOUND", message: "this user don't have orders yet" });
        return res.json(ordersOfUser);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'getAllOrdersOfUser' function ", message: err.message })
    }
}

export const addOrder = async (req, res) => {
    let { products, addressOrder } = req.body;
    try {
//  _id,
        // let token = req.user;
        
        //  order.deliveryDate = new Date(order.deliveryDate);

        // let address = order.address;
        if (!addressOrder)
            return res.status(400).json({ type: "error", message: address.error.details[0].message });
        let validateOrder = orderValidateToAdd({addressOrder});
        if (validateOrder.error)
            return res.status(400).json({ type: "error", message: validateOrder.error.details[0].message });
        // validateOrder = validateOrder.value;
        // validateOrder.userId = token.userId;
        // validateOrder.addressOrder = addressOrder.value;
        let newOrder = await OrderModel.create({orderaDate:new Date(),addressOrder,products,isExit:false});
        // let newOrder = await OrderModel.create({orderaDate:new Date(),addressOrder,_id,products,isExit:false});
        return res.json(newOrder);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'addOrder' function ", message: err.message })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        let id = req.params.id;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "invalid id", message: "invalid order id" });
        let orderUser = await OrderModel.findById(id);
        if (!orderUser)
            return res.status(404).json({ type: "NOT FOUND!", message: "order to delete not found" });

        if (req.user.role != 'ADMIN' && req.user.userId != orderUser.userId)
            return res.status(403).json({ type: "אין הרשאה", message: "delete order function forbbiden for the user" });
        if (orderUser.isExit)
            return res.status(400).json({ type: "ההזמנה יצאה כבר לדרך", message: "the order isInWay" });
        let deletOrder = await OrderModel.findByIdAndDelete(id);
        return res.json(deletOrder);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'deletOrder' function ", message: err.message })
    }
}
export const updateOrderStatus = async (req, res) => {
    try {
        let { id } = req.params;
        if (!isValidObjectId(id))
            return res.status(400).json({ type: "error", message: "id invalid" });
        let order = await OrderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "NOT FOUND", message: "not found order by id" });
        await OrderModel.findByIdAndUpdate(id, { isInWay: true });
        let updatedOrder = await OrderModel.findById(id);
        res.json(updatedOrder);
    }
    catch (err) {
        return res.status(400).json({ type: "Error from 'catch'-> 'updateOrderStatus' function ", message: err.message })
    }
}


