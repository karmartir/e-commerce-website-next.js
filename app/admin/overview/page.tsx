import { Metadata } from "next";
import { auth } from "@/auth";
import { gerOrderSummary } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const OverviewPage = async () => {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  const summary = await gerOrderSummary();
  console.log(summary);

  return <div>OverviewPage</div>;
};

export default OverviewPage;