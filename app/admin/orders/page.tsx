import { requireAdmin } from "@/lib/auth-guard";
import { getAllOrders } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Pagination from "@/components/shared/pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();
  const { page = "1" } = await props.searchParams;
  const orders = await getAllOrders({ page: Number(page) });

  return (
    <div className="space-y-2">
    <h2 className="h2-bold">Orders</h2>
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
                {/* {TODO Delete button} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders.totalPages > 1 && (
        <Pagination
          page={Number(page) || 1}
          totalPages={orders?.totalPages}
        />
      )}
    </div>
  </div>
  );
};
export default AdminOrdersPage;
