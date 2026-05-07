import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  beforePrice: z.number().positive(),
  offer: z.number().min(0).max(100),
  afterPrice: z.number().positive(),
  image: z.string().min(1, "Image is required"),
});

export type ProductInput = z.infer<typeof createProductSchema>;
