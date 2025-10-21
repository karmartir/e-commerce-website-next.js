import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: number;
  createdAt: Date;
  //   description: string;
  //   price: number;
  //   images: string[];
  //   color: string[];
  //   category: string;
  //   size: string[];
  //   createdAt: Date;
  //   updatedAt: Date;
};
