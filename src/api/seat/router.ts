import { ServerRoute } from "@hapi/hapi";
import { bookSeatsHandler, getAllSeatsHandler } from "./handler";

const seatRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/seats",
    handler: getAllSeatsHandler,
  },
  {
    method: "POST",
    path: "/seats/book",
    handler: bookSeatsHandler,
    options: {
      payload: {
        parse: true,
        allow: "application/json",
      },
    },
  },
];

export default seatRoutes;
