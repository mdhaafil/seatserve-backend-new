"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContactsHandler = exports.createContactHandler = void 0;
const contact_operation_1 = require("../../operations/contact.operation");
const contact_validation_1 = require("../../shared/validation/contact.validation");
const createContactHandler = async (req, h) => {
    const error = (0, contact_validation_1.contactValidation)(req.payload);
    if (error) {
        return h.response({ message: error }).code(400);
    }
    try {
        const result = await (0, contact_operation_1.saveContactQuery)(req.payload);
        return h
            .response({
            success: true,
            message: "Contact submitted successfully",
            data: result,
        })
            .code(201);
    }
    catch (err) {
        return h.response({ message: "Server error" }).code(500);
    }
};
exports.createContactHandler = createContactHandler;
const getAllContactsHandler = async (_req, h) => {
    try {
        const contacts = await (0, contact_operation_1.getAllContacts)();
        return h.response(contacts).code(200);
    }
    catch (err) {
        return h.response({ message: "Server error" }).code(500);
    }
};
exports.getAllContactsHandler = getAllContactsHandler;
