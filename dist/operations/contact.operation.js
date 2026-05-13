"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = exports.saveContactQuery = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const saveContactQuery = async (data) => {
    return await Contact_1.default.create(data);
};
exports.saveContactQuery = saveContactQuery;
const getAllContacts = async () => {
    return await Contact_1.default.find().sort({ createdAt: -1 });
};
exports.getAllContacts = getAllContacts;
