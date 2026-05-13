"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const handler_1 = require("./handler");
const Order_1 = __importDefault(require("../../models/Order"));
exports.paymentRoutes = [
    {
        method: "POST",
        path: "/payment/create",
        handler: handler_1.createPayment,
    },
    {
        method: "POST",
        path: "/payment/confirm",
        handler: handler_1.confirmPayment,
    },
    {
        method: "GET",
        path: "/payment/receipt/{id}",
        handler: handler_1.getReceipt,
    },
    {
        method: "GET",
        path: "/order/track-food/{id}",
        handler: handler_1.trackFood,
    },
    {
        method: "GET",
        path: "/admin/orders",
        handler: handler_1.getAllOrders,
    },
    // ✅ NEW ROUTE FOR KITCHEN DATE FILTER
    {
        method: "GET",
        path: "/admin/orders/date/{date}",
        handler: async (request, h) => {
            try {
                const { date } = request.params;
                const start = new Date(date);
                start.setHours(0, 0, 0, 0);
                const end = new Date(date);
                end.setHours(23, 59, 59, 999);
                const orders = await Order_1.default.find({
                    createdAt: {
                        $gte: start,
                        $lte: end,
                    },
                }).sort({ createdAt: -1 });
                const totalOrders = orders.length;
                const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                return h.response({
                    orders,
                    totalOrders,
                    totalRevenue,
                });
            }
            catch (error) {
                console.log("Date filter error:", error);
                return h.response({ error: "Failed to fetch orders" }).code(500);
            }
        },
    }
];
