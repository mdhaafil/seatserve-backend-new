"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_validation_1 = require("../../shared/validation/user.validation");
const user_operation_1 = require("../../operations/user.operation");
const register = async (req, h) => {
    const { error } = user_validation_1.registerSchema.validate(req.payload);
    if (error) {
        return h.response({ message: error.message }).code(400);
    }
    await (0, user_operation_1.createUser)(req.payload);
    return h.response({ message: "User registered" });
};
exports.register = register;
const login = async (req, h) => {
    const { error } = user_validation_1.loginSchema.validate(req.payload);
    if (error) {
        return h.response({ message: error.message }).code(400);
    }
    try {
        const result = await (0, user_operation_1.loginUser)(req.payload.email, req.payload.password);
        return h.response(result);
    }
    catch (err) {
        return h.response({ message: err.message }).code(401);
    }
};
exports.login = login;
