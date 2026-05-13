"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReceiptEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendReceiptEmail = async (to, order) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "seatserve8@gmail.com",
            pass: "wddnzrvohksjawas",
        },
    });
    const itemsList = order.items
        .map((item) => `${item.name} x ${item.quantity}`)
        .join("<br/>");
    const mailOptions = {
        from: "SeatServe <seatserve8@gmail.com>",
        to,
        subject: "SeatServe - Order Receipt",
        html: `
      <h2>We appreciate your order! Sit back and enjoy the show with SeatServe🎬🍿🎉</h2>
      <p><strong>Seats:</strong> ${order.seats.join(", ")}</p>
      <p><strong>Items:</strong></p>
      ${itemsList}
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p>Status: ${order.status}</p>
    `,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendReceiptEmail = sendReceiptEmail;
