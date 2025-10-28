"use client";

import { Button } from "@/components/ui/button";
//import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      //  Error toast with orange background and subtle border
      toast.custom(
        (t) => (
          <div
            className="flex items-center justify-between gap-4 bg-orange-800 text-white px-4 py-3 rounded-lg shadow-lg border border-orange-700 animate-in fade-in-50
                       data-[swipe=end]:animate-out swipe-end:fade-out-50"
          >
            <span className="text-md font-medium px-3">{res.message}</span>
          </div>
        ),
        { duration: 3000 }
      );
      return;
    }

    // ✅ Success toast
    toast.custom(
      (t) => (
        <div
          className="flex items-center justify-between gap-4 bg-white text-gray-900 p-5 rounded-lg shadow-md border border-gray-200 animate-in fade-in-50
                     data-[swipe=end]:animate-out swipe-end:fade-out-50"
        >
          <span className="text-md font-medium">
            &quot;{item.name}&quot; added to cart
          </span>
          <Button
            size="sm"
            className="variant-primary hover:bg-gray-700 text-white"
            onClick={() => {
              router.push("/cart");
              toast.dismiss(t);
            }}
          >
            View Cart
          </Button>
        </div>
      ),
      { duration: 3000 }
    );
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddCart}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
