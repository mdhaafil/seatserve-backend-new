import * as ops from "../../operations/cart.operation";

export const getCartHandler = async () => {
  return ops.getCart();
};

export const addCartHandler = async (req: any) => {
  return ops.addToCart(req.payload);
};

export const updateQtyHandler = async (req: any) => {
  const { id } = req.params;
  const { quantity } = req.payload;

  const updated = await ops.updateQty(id, quantity);
  return updated || { message: "Not found" };
};

export const deleteCartHandler = async (req: any) => {
  const { id } = req.params;
  await ops.removeFromCart(id);
  return { message: "Removed" };
};
