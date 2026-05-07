import Cart from "../models/Cart";

export const getCart = () => Cart.find();

export const addToCart = (data: any) =>
  Cart.findOneAndUpdate(
    { productId: data.productId },
    { $inc: { quantity: 1 }, $setOnInsert: data },
    { new: true, upsert: true },
  );

export const updateQty = (id: string, quantity: number) =>
  Cart.findByIdAndUpdate(id, { $set: { quantity } }, { new: true });

export const removeFromCart = (id: string) => Cart.findByIdAndDelete(id);
