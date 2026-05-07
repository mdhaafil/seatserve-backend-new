import Joi from "joi";

export const bookSeatsValidation = Joi.object({
  seats: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
});
