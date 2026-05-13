"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.trackFood = exports.getReceipt = exports.confirmPayment = exports.createPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const Cart_1 = __importDefault(require("../../models/Cart"));
const Order_1 = __importDefault(require("../../models/Order"));
const Seat_1 = __importDefault(require("../../models/Seat"));
const Product_1 = require("../../models/Product");
const sendEmail_1 = require("../../utils/sendEmail");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
/* =====================================================
   HELPER - INR → GBP CONVERSION
===================================================== */
// ⚠️ For test mode approximate rate
// 1 INR ≈ 0.01 GBP (adjust if needed)
const INR_TO_GBP = 0.01;
const convertINRtoPence = (inrAmount) => {
    const gbpAmount = inrAmount * INR_TO_GBP;
    return Math.round(gbpAmount * 100); // Convert to pence
};
/* =====================================================
   CREATE PAYMENT
===================================================== */
const createPayment = async (req, h) => {
    try {
        const { seats, email } = req.payload;
        if (!seats?.length)
            return h.response({ message: "No seats selected" }).code(400);
        if (!email)
            return h.response({ message: "Email is required" }).code(400);
        const cartItems = await Cart_1.default.find();
        if (!cartItems.length)
            return h.response({ message: "Cart is empty" }).code(400);
        const items = [];
        for (const item of cartItems) {
            const product = await Product_1.Product.findById(item.productId);
            if (!product)
                return h.response({ message: "Product not found" }).code(404);
            if (product.stock < item.quantity)
                return h.response({
                    message: `Not enough stock for ${product.name}`,
                }).code(400);
            items.push({
                productId: item.productId,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.quantity),
            });
        }
        // ✅ Calculate total in INR
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const roundedTotal = Number(totalAmount.toFixed(2));
        if (roundedTotal <= 0)
            return h.response({ message: "Invalid total amount" }).code(400);
        // ✅ Convert INR → GBP (pence)
        const amountInPence = convertINRtoPence(roundedTotal);
        // 🚨 Stripe UK minimum = £0.30 (30 pence)
        if (amountInPence < 30) {
            return h.response({
                message: "Minimum order amount is approximately ₹30",
            }).code(400);
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPence,
            currency: "gbp",
            automatic_payment_methods: { enabled: true },
        });
        const order = await Order_1.default.create({
            items,
            seats,
            totalAmount: roundedTotal, // Stored in ₹
            email,
            paymentIntentId: paymentIntent.id,
            status: "pending",
        });
        return h.response({
            clientSecret: paymentIntent.client_secret,
            totalAmount: roundedTotal,
            items,
            orderId: order._id,
        });
    }
    catch (error) {
        console.error("CREATE PAYMENT ERROR:", error);
        return h.response({ message: "Payment failed" }).code(500);
    }
};
exports.createPayment = createPayment;
/* =====================================================
   CONFIRM PAYMENT
===================================================== */
const confirmPayment = async (req, h) => {
    try {
        const paymentIntentId = req.payload?.paymentIntentId;
        if (!paymentIntentId)
            return h.response({ message: "Missing paymentIntentId" }).code(400);
        const order = await Order_1.default.findOne({ paymentIntentId });
        if (!order)
            return h.response({ message: "Order not found" }).code(404);
        if (order.status === "paid")
            return h.response({
                message: "Already confirmed",
                orderId: order._id,
            });
        // ✅ Mark as paid
        order.status = "paid";
        await order.save();
        // ✅ Reduce stock
        for (const item of order.items) {
            const product = await Product_1.Product.findById(item.productId);
            if (!product)
                continue;
            product.stock -= item.quantity;
            await product.save();
        }
        // ✅ Book seats
        if (order.seats?.length) {
            await Seat_1.default.updateMany({ seatId: { $in: order.seats } }, { isBooked: true });
        }
        // ✅ Clear cart
        await Cart_1.default.deleteMany();
        // ✅ Send receipt
        await (0, sendEmail_1.sendReceiptEmail)(order.email, order);
        return h.response({
            message: "Payment confirmed",
            orderId: order._id,
        });
    }
    catch (error) {
        console.error("CONFIRM ERROR:", error);
        return h.response({ message: "Server error" }).code(500);
    }
};
exports.confirmPayment = confirmPayment;
/* =====================================================
   RECEIPT
===================================================== */
const getReceipt = async (req, h) => {
    try {
        const { id } = req.params;
        const order = await Order_1.default.findById(id);
        if (!order)
            return h.response({ message: "Order not found" }).code(404);
        return h.response(order);
    }
    catch (error) {
        console.error("RECEIPT ERROR:", error);
        return h.response({ message: "Failed to fetch receipt" }).code(500);
    }
};
exports.getReceipt = getReceipt;
/* =====================================================
   FOOD TRACKING
===================================================== */
const getFoodStatus = (createdAt) => {
    const minutes = (Date.now() - new Date(createdAt).getTime()) / 60000;
    if (minutes < 2)
        return "preparing";
    if (minutes < 3.5)
        return "on_the_way";
    return "delivered";
};
const trackFood = async (req, h) => {
    try {
        const { id } = req.params;
        const order = await Order_1.default.findById(id);
        if (!order)
            return h.response({ message: "Order not found" }).code(404);
        const foodStatus = getFoodStatus(order.createdAt);
        return h.response({
            orderId: order._id,
            foodStatus,
            createdAt: order.createdAt,
        });
    }
    catch (error) {
        console.error("TRACK ERROR:", error);
        return h.response({ message: "Tracking failed" }).code(500);
    }
};
exports.trackFood = trackFood;
/* =====================================================
   ADMIN - ALL ORDERS
===================================================== */
const getAllOrders = async (_, h) => {
    const orders = await Order_1.default.find().sort({ createdAt: -1 });
    return h.response(orders.map((o) => ({
        id: o._id,
        seats: o.seats,
        items: o.items,
        totalAmount: o.totalAmount, // still ₹
        email: o.email,
        status: o.status,
        time: o.createdAt,
    })));
};
exports.getAllOrders = getAllOrders;
