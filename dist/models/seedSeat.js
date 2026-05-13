"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Seat_1 = __importDefault(require("./Seat"));
const seats = [];
["A", "B", "C", "D"].forEach((row) => {
    for (let i = 1; i <= 10; i++) {
        seats.push({ seatNo: `${row}${i}` });
    }
});
const seed = async () => {
    await mongoose_1.default.connect("mongodb://127.0.0.1:27017/seatserve");
    await Seat_1.default.deleteMany();
    await Seat_1.default.insertMany(seats);
    console.log("Seats seeded");
    process.exit();
};
seed();
