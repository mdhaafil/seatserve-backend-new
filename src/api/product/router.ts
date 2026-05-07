import { ServerRoute } from "@hapi/hapi";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./handler";

export const productRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/products",
    handler: createProduct,
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        maxBytes: 5 * 1024 * 1024,
      },
    },
  },
  {
    method: "GET",
    path: "/api/products",
    handler: getAllProducts,
  },
  {
    method: "GET",
    path: "/api/products/{id}",
    handler: getOneProduct,
  },
  {
    method: "PUT",
    path: "/api/products/{id}",
    handler: updateProduct,
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 5 * 1024 * 1024,
      },
    },
  },
  {
    method: "DELETE",
    path: "/api/products/{id}",
    handler: deleteProduct,
  },
];
