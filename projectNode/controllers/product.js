// import mongoose from "mongoose";
import mongoose from "mongoose";


import { ProductModel } from "../Models/product.js";

export const getAllProduct = async (req, res) => {

    let { search } = req.query;
    let perPage = req.query.perPage||9 ;
    let page = req.query.page || 1;


   
    try {
        let filter = {};
        if (search) {
            filter.name = new RegExp(search, 'i');
        }
        let allProduct = await ProductModel.find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage);

        res.json(allProduct);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        let {idProduct} = req.params;
        console.log(idProduct);
        if (!mongoose.isValidObjectId)
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let product = await ProductModel.findById(idProduct);
        if (!product)
            return res.status(404).json({ type: "id not found", message: "didnt find " })
        res.json(product);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}


export const addProduct = async (req, res) => {
    // let validate = validateAddProduct(req.body);
    // if (validate.error)
    //     return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });
    try {
        let { productName, description, datOfProduction, picture, price, target,company,CPUspeed } = req.body;
        if (!productName || !price)
            return res.status(404).json({ type: "missing paramters", message: "productName or price is missing" })

        let sameProduct = await ProductModel.findOne({ productName, price });
        if (sameProduct)
            return res.status(409).json({ type: "same product", message: "same details" })



        let newProduct = await ProductModel.create({ productName, description, datOfProduction, picture, price, target,company,CPUspeed});

        res.json(newProduct);

    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}


export const deleteProductById = async (req, res) => {
    try {
        let { idProduct } = req.params;
        if (!mongoose.isValidObjectId)
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        const product = await ProductModel.findById(idProduct);
        if (!product)
            return res.status(404).json({ type: "id not found to delete", message: "didnt find " })
        // if (!req.user.role == "Admin" && !req.user._id == product.ownerId)
        //     return res.status(403).json({ type: "epration not allowed", message: "only manager or owner can delete " })
        const deleted = await ProductModel.findByIdAndDelete(idProduct);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const updateProduct = async (req, res) => {
    let { idProduct } = req.params;
    try {
        if (!mongoose.isValidObjectId(idProduct))
            return res.status(404).json({ type: "id not found to update", message: "didnt find product with such id" })
        let productToUpdate = await ProductModel.findById(idProduct);
        if (!productToUpdate)
            return res.status(404).json({ type: "product not found to update", message: "didnt find this product " })
        await ProductModel.findByIdAndUpdate(idProduct, req.body);
        let product = await ProductModel.findById(idProduct)
        res.json(product);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}



