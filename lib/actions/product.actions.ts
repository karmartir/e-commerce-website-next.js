"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";

export async function getLatestProducts() {
  // get latest products
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: LATEST_PRODUCTS_LIMIT,
  });

  // Convert to plain object from prisma via utils
  return convertToPlainObject(data);
}
// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findFirst({ where: { slug: slug } });
  return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const dataCount = await prisma.product.count();
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
