"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductOperation = exports.updateProductOperation = exports.getOneProductOperation = exports.getAllProductOperation = exports.createProductOperation = void 0;
const Product_1 = require("../models/Product");
/* ============================
   CREATE
============================ */
const createProductOperation = async (data) => {
    return await Product_1.Product.create(data);
};
exports.createProductOperation = createProductOperation;
/* ============================
   GET ALL
============================ */
const getAllProductOperation = async () => {
    return await Product_1.Product.find().sort({ createdAt: -1 });
};
exports.getAllProductOperation = getAllProductOperation;
/* ============================
   GET ONE
============================ */
const getOneProductOperation = async (id) => {
    return await Product_1.Product.findById(id);
};
exports.getOneProductOperation = getOneProductOperation;
/* ============================
   UPDATE
============================ */
const updateProductOperation = async (id, data) => {
    return await Product_1.Product.findByIdAndUpdate(id, data, { new: true });
};
exports.updateProductOperation = updateProductOperation;
/* ============================
   DELETE
============================ */
const deleteProductOperation = async (id) => {
    return await Product_1.Product.findByIdAndDelete(id);
};
exports.deleteProductOperation = deleteProductOperation;
