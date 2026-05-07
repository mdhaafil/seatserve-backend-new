import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  loginSchema,
  registerSchema,
} from "../../shared/validation/user.validation";
import { createUser, loginUser } from "../../operations/user.operation";

export const register = async (req: Request, h: ResponseToolkit) => {
  const { error } = registerSchema.validate(req.payload);

  if (error) {
    return h.response({ message: error.message }).code(400);
  }

  await createUser(req.payload);

  return h.response({ message: "User registered" });
};

export const login = async (req: Request, h: ResponseToolkit) => {
  const { error } = loginSchema.validate(req.payload);

  if (error) {
    return h.response({ message: error.message }).code(400);
  }

  try {
    const result = await loginUser(
      (req.payload as any).email,
      (req.payload as any).password,
    );

    return h.response(result);
  } catch (err: any) {
    return h.response({ message: err.message }).code(401);
  }
};
