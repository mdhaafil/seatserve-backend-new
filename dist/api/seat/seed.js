"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSeats = void 0;
const Seat_1 = __importDefault(require("../../models/Seat"));
const seedSeats = async () => {
    await Seat_1.default.deleteMany({}); // clear old data
    const rows = "ABCDEFGHIJ".split(""); // A → J
    const seats = [];
    for (const row of rows) {
        for (let num = 1; num <= 10; num++) {
            seats.push({
                seatId: `${row}${num}`, // A1, A2...
                row,
                number: num,
                type: row <= "C" ? "PLATINUM" : "GOLD",
                price: row <= "C" ? 250 : 180,
                isBooked: false,
            });
        }
    }
    await Seat_1.default.insertMany(seats);
    console.log("✅ Seats seeded A → J");
};
exports.seedSeats = seedSeats;
