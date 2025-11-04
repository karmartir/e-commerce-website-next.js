"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader, X } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

/**
 * A reusable toast function for both success and error messages.
 * Optionally accepts a "View Cart" button handler.
 */
const showToast = (
  message: string,
  options?: {
    viewCart?: boolean;
    router?: ReturnType<typeof useRouter>;
    success?: boolean;
  }
) => {
  const { viewCart, router, success = true } = options || {};

  toast.custom(
    (t) => (
      <div
        className={`relative flex items-center justify-between gap-5 max-w-md w-full sm:max-w-lg px-5 py-3 rounded-lg shadow-md border animate-in fade-in-50 data-[swipe=end]:animate-out swipe-end:fade-out-50
          ${
            success
              ? "bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              : "bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-900"
          }`}
      >
        <button
          onClick={() => toast.dismiss(t)}
          className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-md border
    text-gray-500 border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900
    dark:bg-white dark:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-200
    transition-colors duration-150"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <span className="text-md font-medium">{message}</span>

        {viewCart && router && (
          <Button
            size="sm"
            className="variant-primary me-5 bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
            onClick={() => {
              router.push("/cart");
              toast.dismiss(t);
            }}
          >
            View Cart
          </Button>
        )}
      </div>
    ),
    { duration: 3000 }
  );
};

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        showToast(res.message, { success: false });
        return;
      }
      showToast(res.message, { success: true, viewCart: true, router });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      if (!res.success) {
        showToast(res.message, { success: false });
        return;
      }
      showToast(res.message, { success: true });
    });
  };

  const existItem = cart?.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={handleRemoveFromCart}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        onClick={handleAddCart}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      onClick={handleAddCart}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
};

export default AddToCart;
