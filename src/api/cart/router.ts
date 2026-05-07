import { ServerRoute } from "@hapi/hapi";

import {
  getCartHandler,
  addCartHandler,
  updateQtyHandler,
  deleteCartHandler,
} from "./handler";

const cartRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/cart",
    handler: getCartHandler,
  },
  {
    method: "POST",
    path: "/cart/add",
    handler: addCartHandler,
  },
  {
    method: "PUT",
    path: "/cart/{id}",
    handler: updateQtyHandler,
  },
  {
    method: "DELETE",
    path: "/cart/{id}",
    handler: deleteCartHandler,
  },
];

export default cartRoutes;
