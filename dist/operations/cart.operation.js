"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.updateQty = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = () => Cart_1.default.find();
exports.getCart = getCart;
const addToCart = (data) => Cart_1.default.findOneAndUpdate({ productId: data.productId }, { $inc: { quantity: 1 }, $setOnInsert: data }, { new: true, upsert: true });
exports.addToCart = addToCart;
const updateQty = (id, quantity) => Cart_1.default.findByIdAndUpdate(id, { $set: { quantity } }, { new: true });
exports.updateQty = updateQty;
const removeFromCart = (id) => Cart_1.default.findByIdAndDelete(id);
exports.removeFromCart = removeFromCart;
