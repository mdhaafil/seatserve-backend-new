"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSeatsValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookSeatsValidation = joi_1.default.object({
    seats: joi_1.default.array()
        .items(joi_1.default.string().required())
        .min(1)
        .required()
});
