import Joi from "joi";

export const addCartSchema = Joi.object({
  productId: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
});
