import { ServerRoute } from "@hapi/hapi";
import { uploadFile } from "./handler";

const uploadRoute: ServerRoute[] = [
  {
    method: "POST",
    path: "/upload",
    options: {
      payload: {
        maxBytes: 5 * 1024 * 1024, // 5MB
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
    handler: uploadFile,
  },
];

export default uploadRoute;
