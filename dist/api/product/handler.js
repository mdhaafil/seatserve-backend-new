"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const product_operation_1 = require("../../operations/product.operation");
/* =====================================================
   CREATE PRODUCT
===================================================== */
const createProduct = async (req, h) => {
    try {
        const payload = req.payload;
        let imagePath = "";
        // ✅ Handle Image Upload
        if (payload.image?.hapi) {
            const file = payload.image;
            const fileName = Date.now() + "-" + file.hapi.filename;
            const uploadDir = path_1.default.join(process.cwd(), "uploads");
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path_1.default.join(uploadDir, fileName);
            const chunks = [];
            for await (const chunk of file) {
                chunks.push(chunk);
            }
            fs_1.default.writeFileSync(filePath, Buffer.concat(chunks));
            imagePath = `/uploads/${fileName}`;
        }
        // ✅ Auto calculate afterPrice
        const beforePrice = Number(payload.beforePrice);
        const offer = Number(payload.offer || 0);
        const stock = Number(payload.stock || 0);
        const afterPrice = beforePrice - (beforePrice * offer) / 100;
        const product = await (0, product_operation_1.createProductOperation)({
            name: payload.name,
            category: payload.category,
            description: payload.description,
            beforePrice,
            offer,
            afterPrice,
            stock,
            image: imagePath,
        });
        return h.response(product).code(201);
    }
    catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};
exports.createProduct = createProduct;
/* =====================================================
   GET ALL PRODUCTS
===================================================== */
const getAllProducts = async (_req, h) => {
    try {
        const products = await (0, product_operation_1.getAllProductOperation)();
        return h.response(products).code(200);
    }
    catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};
exports.getAllProducts = getAllProducts;
/* =====================================================
   GET ONE PRODUCT
===================================================== */
const getOneProduct = async (req, h) => {
    try {
        const { id } = req.params;
        const product = await (0, product_operation_1.getOneProductOperation)(id);
        if (!product) {
            return h.response({ error: "Product not found" }).code(404);
        }
        return h.response(product).code(200);
    }
    catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};
exports.getOneProduct = getOneProduct;
/* =====================================================
   UPDATE PRODUCT
===================================================== */
const updateProduct = async (req, h) => {
    try {
        const { id } = req.params;
        const payload = req.payload;
        let imagePath = payload.image;
        // ✅ Handle new image upload
        if (payload.image?.hapi) {
            const file = payload.image;
            const fileName = Date.now() + "-" + file.hapi.filename;
            const uploadDir = path_1.default.join(process.cwd(), "uploads");
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path_1.default.join(uploadDir, fileName);
            const chunks = [];
            for await (const chunk of file) {
                chunks.push(chunk);
            }
            fs_1.default.writeFileSync(filePath, Buffer.concat(chunks));
            imagePath = `/uploads/${fileName}`;
        }
        const beforePrice = Number(payload.beforePrice);
        const offer = Number(payload.offer || 0);
        const stock = Number(payload.stock || 0);
        const afterPrice = beforePrice - (beforePrice * offer) / 100;
        const updated = await (0, product_operation_1.updateProductOperation)(id, {
            name: payload.name,
            category: payload.category,
            description: payload.description,
            beforePrice,
            offer,
            afterPrice,
            stock,
            image: imagePath,
        });
        if (!updated) {
            return h.response({ error: "Product not found" }).code(404);
        }
        return h.response(updated).code(200);
    }
    catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};
exports.updateProduct = updateProduct;
/* =====================================================
   DELETE PRODUCT
===================================================== */
const deleteProduct = async (req, h) => {
    try {
        const { id } = req.params;
        const product = await (0, product_operation_1.deleteProductOperation)(id);
        if (!product) {
            return h.response({ error: "Product not found" }).code(404);
        }
        // 🗑 Delete image
        if (product.image) {
            const imagePath = path_1.default.join(process.cwd(), product.image.replace("/", ""));
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
            }
        }
        return h.response({
            message: "Product & image deleted successfully",
        }).code(200);
    }
    catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};
exports.deleteProduct = deleteProduct;
