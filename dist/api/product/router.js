"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const handler_1 = require("./handler");
exports.productRoutes = [
    {
        method: "POST",
        path: "/api/products",
        handler: handler_1.createProduct,
        options: {
            payload: {
                output: "stream",
                parse: true,
                multipart: true,
                maxBytes: 5 * 1024 * 1024,
            },
        },
    },
    {
        method: "GET",
        path: "/api/products",
        handler: handler_1.getAllProducts,
    },
    {
        method: "GET",
        path: "/api/products/{id}",
        handler: handler_1.getOneProduct,
    },
    {
        method: "PUT",
        path: "/api/products/{id}",
        handler: handler_1.updateProduct,
        options: {
            payload: {
                output: "stream",
                parse: true,
                multipart: true,
                allow: "multipart/form-data",
                maxBytes: 5 * 1024 * 1024,
            },
        },
    },
    {
        method: "DELETE",
        path: "/api/products/{id}",
        handler: handler_1.deleteProduct,
    },
];
