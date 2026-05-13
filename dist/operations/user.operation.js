"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const createUser = async (data) => {
    const hash = await bcrypt_1.default.hash(data.password, 10);
    return User_1.default.create({
        name: data.name,
        email: data.email,
        password: hash,
    });
};
exports.createUser = createUser;
const loginUser = async (email, password) => {
    const user = await User_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return {
        token,
        role: user.role,
    };
};
exports.loginUser = loginUser;
