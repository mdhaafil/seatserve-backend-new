"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const inert_1 = __importDefault(require("@hapi/inert"));
const path_1 = __importDefault(require("path"));
const mongo_1 = require("./database/mongo");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Routes
const router_1 = require("./api/product/router");
const router_2 = __importDefault(require("./api/contact/router"));
const router_3 = __importDefault(require("./api/seat/router"));
const seed_1 = require("./api/seat/seed");
const router_4 = __importDefault(require("./api/cart/router"));
const router_5 = require("./api/order/router");
const router_6 = require("./api/auth/router");
const startServer = async () => {
    await (0, mongo_1.connectDB)();
    await (0, seed_1.seedSeats)();
    const server = hapi_1.default.server({
        port: 5000,
        host: "localhost",
        routes: {
            cors: true,
            files: {
                relativeTo: path_1.default.join(__dirname, ".."), // 🔥 IMPORTANT
            },
        },
    });
    // 🔥 Register inert (static files)
    await server.register(inert_1.default);
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
    server.route(router_1.productRoutes);
    server.route(router_6.authRoutes);
    server.route(router_2.default);
    server.route(router_3.default);
    server.route(router_4.default);
    server.route(router_5.paymentRoutes);
    await server.start();
    console.log(`🚀 Server running on ${server.info.uri}`);
};
startServer();
