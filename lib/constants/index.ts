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

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "Cash on Delivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";


export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES ? process.env.USER_ROLES.split(', ') : ['admin', 'user']