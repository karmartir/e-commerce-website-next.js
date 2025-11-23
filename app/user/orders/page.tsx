import { Metadata } from "next";
import { auth } from "@/auth";
import { getMyOrders } from "@/lib/actions/order.actions";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "MyOrders",
};
const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;
  const orders = await getMyOrders({
    page: Number(page) || 1,
  });
	const session = await auth();
	const name = session?.user?.name || "My";
	const displayName = name.endsWith("s") ? `${name}'` : `${name}'s`;
  return (
    <div className="space-y-2">
      <h2 className="h2-bold">{displayName} Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <span className="text-muted-foreground">
                      {formatDateTime(order.paidAt).dateTime}
                    </span>
                  ) : (
                    <span className="text-red-800">Not Paid!</span>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt ? (
                    <span className="text-muted-foreground">
                      {formatDateTime(order.deliveredAt).dateTime}
                    </span>
                  ) : (
                    <span className="">Not Delivered!</span>
                  )}
                </TableCell>
                <TableCell>
                <Button asChild variant='outline' size='sm'>
                <Link href={`/order/${order.id}`}>
                    Details
                </Link>
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
            // urlParamName="page"
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
