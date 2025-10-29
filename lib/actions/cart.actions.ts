"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { formatError } from "../utils";

export async function addItemToCart(data: CartItem) {
  try {
    // Check for the cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    // TESTING
    console.log("Session Cart ID:", sessionCartId);
    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
