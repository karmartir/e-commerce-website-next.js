export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Pro Store";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern e-commerce platform built with Next.js 13";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT) || 6;
export const signInDefaultValues = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
};
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//For deployment I use empty strings and for local development .env variables
// You can use your own values or leave them empty
export const shippingAddressDefaultValues = {
  fullName: process.env.NEXT_PUBLIC_FULL_NAME || "",
  streetAddress: process.env.NEXT_PUBLIC_ADDRESS || "",
  city: process.env.NEXT_PUBLIC_CITY || "",
  postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || "",
  country: process.env.NEXT_PUBLIC_COUNTRY || "",
};
