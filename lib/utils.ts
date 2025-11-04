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
// Round a number to specified decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Invalid input type");
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
//Format currency using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount !== "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
}
