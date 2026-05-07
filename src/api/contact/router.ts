import { ServerRoute } from "@hapi/hapi";
import { createContactHandler, getAllContactsHandler } from "./handler";

const contactRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/contact",
    handler: createContactHandler,
  },
  {
    method: "GET",
    path: "/contact",
    handler: getAllContactsHandler,
  },
];

export default contactRoutes;
