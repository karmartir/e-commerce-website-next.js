"use server";
import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

export async function getLatestProducts() {
  // Fetch latest products
  const prisma = new PrismaClient();
  // Get latest products
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: LATEST_PRODUCTS_LIMIT,
  });
  console.log(LATEST_PRODUCTS_LIMIT);
  // Convert to plain object from prisma via utils
  return convertToPlainObject(data);
}
