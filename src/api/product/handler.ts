import { Request, ResponseToolkit } from "@hapi/hapi";
import fs from "fs";
import path from "path";
import {
  createProductOperation,
  deleteProductOperation,
  getAllProductOperation,
  getOneProductOperation,
  updateProductOperation,
} from "../../operations/product.operation";

/* =====================================================
   CREATE PRODUCT
===================================================== */
export const createProduct = async (req: Request, h: ResponseToolkit) => {
  try {
    const payload: any = req.payload;
    let imagePath = "";

    // ✅ Handle Image Upload
    if (payload.image?.hapi) {
      const file = payload.image;
      const fileName = Date.now() + "-" + file.hapi.filename;
      const uploadDir = path.join(process.cwd(), "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);

      const chunks: Buffer[] = [];
      for await (const chunk of file) {
        chunks.push(chunk);
      }

      fs.writeFileSync(filePath, Buffer.concat(chunks));
      imagePath = `/uploads/${fileName}`;
    }

    // ✅ Auto calculate afterPrice
    const beforePrice = Number(payload.beforePrice);
    const offer = Number(payload.offer || 0);
    const stock = Number(payload.stock || 0);

    const afterPrice =
      beforePrice - (beforePrice * offer) / 100;

    const product = await createProductOperation({
      name: payload.name,
      category: payload.category,
      description: payload.description,
      beforePrice,
      offer,
      afterPrice,
      stock,
      image: imagePath,
    });

    return h.response(product).code(201);
  } catch (err: any) {
    return h.response({ error: err.message }).code(500);
  }
};

/* =====================================================
   GET ALL PRODUCTS
===================================================== */
export const getAllProducts = async (_req: Request, h: ResponseToolkit) => {
  try {
    const products = await getAllProductOperation();
    return h.response(products).code(200);
  } catch (err: any) {
    return h.response({ error: err.message }).code(500);
  }
};

/* =====================================================
   GET ONE PRODUCT
===================================================== */
export const getOneProduct = async (req: Request, h: ResponseToolkit) => {
  try {
    const { id } = req.params as any;
    const product = await getOneProductOperation(id);

    if (!product) {
      return h.response({ error: "Product not found" }).code(404);
    }

    return h.response(product).code(200);
  } catch (err: any) {
    return h.response({ error: err.message }).code(500);
  }
};

/* =====================================================
   UPDATE PRODUCT
===================================================== */
export const updateProduct = async (req: Request, h: ResponseToolkit) => {
  try {
    const { id } = req.params as any;
    const payload: any = req.payload;

    let imagePath = payload.image;

    // ✅ Handle new image upload
    if (payload.image?.hapi) {
      const file = payload.image;
      const fileName = Date.now() + "-" + file.hapi.filename;
      const uploadDir = path.join(process.cwd(), "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);

      const chunks: Buffer[] = [];
      for await (const chunk of file) {
        chunks.push(chunk);
      }

      fs.writeFileSync(filePath, Buffer.concat(chunks));
      imagePath = `/uploads/${fileName}`;
    }

    const beforePrice = Number(payload.beforePrice);
    const offer = Number(payload.offer || 0);
    const stock = Number(payload.stock || 0);

    const afterPrice =
      beforePrice - (beforePrice * offer) / 100;

    const updated = await updateProductOperation(id, {
      name: payload.name,
      category: payload.category,
      description: payload.description,
      beforePrice,
      offer,
      afterPrice,
      stock,
      image: imagePath,
    });

    if (!updated) {
      return h.response({ error: "Product not found" }).code(404);
    }

    return h.response(updated).code(200);
  } catch (err: any) {
    return h.response({ error: err.message }).code(500);
  }
};

/* =====================================================
   DELETE PRODUCT
===================================================== */
export const deleteProduct = async (req: Request, h: ResponseToolkit) => {
  try {
    const { id } = req.params as any;

    const product = await deleteProductOperation(id);

    if (!product) {
      return h.response({ error: "Product not found" }).code(404);
    }

    // 🗑 Delete image
    if (product.image) {
      const imagePath = path.join(
        process.cwd(),
        product.image.replace("/", "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return h.response({
      message: "Product & image deleted successfully",
    }).code(200);
  } catch (err: any) {
    return h.response({ error: err.message }).code(500);
  }
};
