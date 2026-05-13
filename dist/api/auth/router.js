"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const handler_1 = require("./handler");
exports.authRoutes = [
    {
        method: "POST",
        path: "/auth/register",
        handler: handler_1.register,
    },
    {
        method: "POST",
        path: "/auth/login",
        handler: handler_1.login,
    },
];
