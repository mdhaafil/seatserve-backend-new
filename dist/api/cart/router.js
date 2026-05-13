"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const cartRoutes = [
    {
        method: "GET",
        path: "/cart",
        handler: handler_1.getCartHandler,
    },
    {
        method: "POST",
        path: "/cart/add",
        handler: handler_1.addCartHandler,
    },
    {
        method: "PUT",
        path: "/cart/{id}",
        handler: handler_1.updateQtyHandler,
    },
    {
        method: "DELETE",
        path: "/cart/{id}",
        handler: handler_1.deleteCartHandler,
    },
];
exports.default = cartRoutes;
