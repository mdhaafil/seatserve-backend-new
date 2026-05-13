import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import path from "path";
import dotenv from "dotenv";

import { connectDB } from "./database/mongo";

// Routes
import { productRoutes } from "./api/product/router";
import contactRoutes from "./api/contact/router";
import seatRoutes from "./api/seat/router";
// import { seedSeats } from "./api/seat/seed";
import cartRoutes from "./api/cart/router";
import { paymentRoutes } from "./api/order/router";
import { authRoutes } from "./api/auth/router";

dotenv.config();

const startServer = async () => {
  try {
    console.log("🚀 Starting server...");

    await connectDB();
    console.log("✅ MongoDB connected");

    // await seedSeats();

    const server = Hapi.server({
      port: Number(process.env.PORT) || 5000,
      host: "0.0.0.0",
      routes: {
        cors: true,
        files: {
          relativeTo: path.join(__dirname, ".."),
        },
      },
    });
    

    // Register inert
    await server.register(Inert);

    // Static uploads route
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

    console.log(`✅ Server running on ${server.info.uri}`);
  } catch (error) {
    console.error("❌ Startup Error:", error);
    process.exit(1);
  }
};

startServer();