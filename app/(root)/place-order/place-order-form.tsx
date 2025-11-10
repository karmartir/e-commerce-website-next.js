"use client";
import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { createOrder } from "@/lib/actions/order.actions";
import React from "react";
const PlaceOrderForm = () => {
  const router = useRouter();
  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        className="w-full"
        variant="default"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        Place Order
      </Button>
    );
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await createOrder();
    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
