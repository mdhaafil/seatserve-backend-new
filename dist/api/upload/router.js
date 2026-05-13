"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const uploadRoute = [
    {
        method: "POST",
        path: "/upload",
        options: {
            payload: {
                maxBytes: 5 * 1024 * 1024, // 5MB
                output: "stream",
                parse: true,
                multipart: true,
                allow: "multipart/form-data",
            },
        },
        handler: handler_1.uploadFile,
    },
];
exports.default = uploadRoute;
