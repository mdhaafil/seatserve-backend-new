import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import path from "path";
import { connectDB } from "./database/mongo";
import dotenv from "dotenv";

dotenv.config();

// Routes

import { productRoutes } from "./api/product/router";

import contactRoutes from "./api/contact/router";
import seatRoutes from "./api/seat/router";
import { seedSeats } from "./api/seat/seed";
import cartRoutes from "./api/cart/router";
import { paymentRoutes } from "./api/order/router";
import { authRoutes } from "./api/auth/router";

const startServer = async () => {
  await connectDB();
  await seedSeats();

  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: true,
      files: {
        relativeTo: path.join(__dirname, ".."), // 🔥 IMPORTANT
      },
    },
  });

  // 🔥 Register inert (static files)
  await server.register(Inert);

  // 🔥 Static uploads route
  server.route({
    method: "GET",
    path: "/uploads/{param*}",
    handler: {
      directory: {
        path: "uploads",
        listing: false,
      },
    },
  });

  // API routes
  server.route(productRoutes);
  server.route(authRoutes);
  server.route(contactRoutes);
  server.route(seatRoutes);
  server.route(cartRoutes);
  server.route(paymentRoutes);

  await server.start();
  console.log(`🚀 Server running on ${server.info.uri}`);
};

startServer();
