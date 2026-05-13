"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartHandler = exports.updateQtyHandler = exports.addCartHandler = exports.getCartHandler = void 0;
const ops = __importStar(require("../../operations/cart.operation"));
const getCartHandler = async () => {
    return ops.getCart();
};
exports.getCartHandler = getCartHandler;
const addCartHandler = async (req) => {
    return ops.addToCart(req.payload);
};
exports.addCartHandler = addCartHandler;
const updateQtyHandler = async (req) => {
    const { id } = req.params;
    const { quantity } = req.payload;
    const updated = await ops.updateQty(id, quantity);
    return updated || { message: "Not found" };
};
exports.updateQtyHandler = updateQtyHandler;
const deleteCartHandler = async (req) => {
    const { id } = req.params;
    await ops.removeFromCart(id);
    return { message: "Removed" };
};
exports.deleteCartHandler = deleteCartHandler;
