import { Metadata } from "next";
import { getOrderSummary } from "@/lib/actions/order.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Barcode, CreditCard, Users } from "lucide-react";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Charts from "./charts";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};



const OverviewPage = async () => {
  await requireAdmin();
  const summary = await getOrderSummary();

  return (
    <div className="space-y-4">
      <h1 className="h2-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BadgeDollarSign className="h-6 w-6 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalSales._sum.totalPrice ?? 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-6 w-6 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(summary.ordersCount)}
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(summary.usersCount)}
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Barcode className="h-6 w-6 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(summary.productsCount)}
              </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">     
          <CardHeader>
            <CardTitle>Monthly Sales Chart:</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts data={{ salesData: summary.salesData || [] }} />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">     
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>BUYER</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.latestSales.map((order) =>(
              <TableRow key={order.id}>
                <TableCell>
                  {order?.user?.name ? order.user.name : 'Deleted User'}
                </TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateOnly}
                </TableCell>
                <TableCell>
                  {formatCurrency(order.totalPrice)}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                  <span className="px-2">Details...</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
         </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
