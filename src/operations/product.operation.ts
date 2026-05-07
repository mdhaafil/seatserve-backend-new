import { Product } from "../models/Product";

/* ============================
   CREATE
============================ */
export const createProductOperation = async (data: {
  name: string;
  category: string;
  description: string;
  beforePrice: number;
  offer: number;
  afterPrice: number;
  image: string;
  stock: number; // ✅ added
}) => {
  return await Product.create(data);
};

/* ============================
   GET ALL
============================ */
export const getAllProductOperation = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

/* ============================
   GET ONE
============================ */
export const getOneProductOperation = async (id: string) => {
  return await Product.findById(id);
};

/* ============================
   UPDATE
============================ */
export const updateProductOperation = async (
  id: string,
  data: Partial<{
    name: string;
    category: string;
    description: string;
    beforePrice: number;
    offer: number;
    afterPrice: number;
    image: string;
    stock: number; // ✅ added
  }>
) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

/* ============================
   DELETE
============================ */
export const deleteProductOperation = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
