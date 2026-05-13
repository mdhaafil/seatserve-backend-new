"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactValidation = void 0;
const contactValidation = (body) => {
    const { name, phone, email, message } = body;
    if (!name || !phone || !email || !message) {
        return "All fields are required";
    }
    return null;
};
exports.contactValidation = contactValidation;
