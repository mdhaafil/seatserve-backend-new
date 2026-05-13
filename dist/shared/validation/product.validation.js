"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    beforePrice: zod_1.z.number().positive(),
    offer: zod_1.z.number().min(0).max(100),
    afterPrice: zod_1.z.number().positive(),
    image: zod_1.z.string().min(1, "Image is required"),
});
