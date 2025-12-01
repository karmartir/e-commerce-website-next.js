import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound, redirect } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import Stripe from 'stripe';

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) return notFound();

  // Redirect if the user doesn't own the order
  if (order.userId !== session?.user.id && session?.user.role !== 'admin') {
    return redirect('/unauthorized');
  }

  let client_secret: string | null = null;

  if (order.paymentMethod === 'Stripe' && !order.isPaid) {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(order.totalPrice) * 100), // amount in cents
        currency: 'USD',
        metadata: { orderId: order.id },
      });

      client_secret = paymentIntent.client_secret ?? null;

    } catch (error) {
      console.error('Failed to create Stripe payment intent:', error);
      // Optional: show a notification to the user in the UI
    }
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      stripeClientSecret={client_secret}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      isAdmin={session?.user?.role === 'admin' || false}
    />
  );
};

export default OrderDetailsPage;