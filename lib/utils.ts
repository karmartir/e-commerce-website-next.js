import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert a prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format errors, modern version
export function formatError(error: unknown) {
  // Handle Zod errors
  if (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: string }).name === "ZodError" &&
    Array.isArray((error as { issues?: unknown }).issues)
  ) {
    const zodError = error as { issues: { message: string }[] };
    return zodError.issues.map((issue) => issue.message).join(". ");
  }

  // Handle Prisma unique constraint errors
  if (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: string }).name === "PrismaClientKnownRequestError" &&
    (error as { code?: string }).code === "P2002"
  ) {
    return "A user with this email already exists.";
  }

  // Handle standard JS errors
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unexpected cases
  return "Something went wrong. Please try again.";
}
