import { ServerRoute } from "@hapi/hapi";
import { register, login } from "./handler";

export const authRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/auth/register",
    handler: register,
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: login,
  },
];
