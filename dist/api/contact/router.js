"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const contactRoutes = [
    {
        method: "POST",
        path: "/contact",
        handler: handler_1.createContactHandler,
    },
    {
        method: "GET",
        path: "/contact",
        handler: handler_1.getAllContactsHandler,
    },
];
exports.default = contactRoutes;
