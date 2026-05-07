import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const createUser = async (data: any) => {
  const hash = await bcrypt.hash(data.password, 10);

  return User.create({
    name: data.name,
    email: data.email,
    password: hash,
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );

  return {
    token,
    role: user.role,
  };
};
