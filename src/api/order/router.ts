import { ServerRoute } from "@hapi/hapi";
import {
  confirmPayment,
  createPayment,
  getAllOrders,
  getReceipt,
  trackFood,
} from "./handler";

import Order from "../../models/Order";
import { Product } from "../../models/Product";
import { sendReceiptEmail } from "../../utils/sendEmail";

export const paymentRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/payment/create",
    handler: createPayment,
  },

  {
    method: "POST",
    path: "/payment/confirm",
    handler: confirmPayment,
  },

  {
    method: "GET",
    path: "/payment/receipt/{id}",
    handler: getReceipt,
  },

  {
    method: "GET",
    path: "/order/track-food/{id}",
    handler: trackFood,
  },

  {
    method: "GET",
    path: "/admin/orders",
    handler: getAllOrders,
  },

  // ✅ NEW ROUTE FOR KITCHEN DATE FILTER
  {
  method: "GET",
  path: "/admin/orders/date/{date}",
  handler: async (request, h) => {
    try {
      const { date } = request.params as { date: string };

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const orders = await Order.find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      }).sort({ createdAt: -1 });

      const totalOrders = orders.length;

      const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );

      return h.response({
        orders,
        totalOrders,
        totalRevenue,
      });

    } catch (error) {
      console.log("Date filter error:", error);
      return h.response({ error: "Failed to fetch orders" }).code(500);
    }
  },
}];