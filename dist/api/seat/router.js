"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const seatRoutes = [
    {
        method: "GET",
        path: "/seats",
        handler: handler_1.getAllSeatsHandler,
    },
    {
        method: "POST",
        path: "/seats/book",
        handler: handler_1.bookSeatsHandler,
        options: {
            payload: {
                parse: true,
                allow: "application/json",
            },
        },
    },
];
exports.default = seatRoutes;
