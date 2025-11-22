"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

function Charts({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) {
  // Handle edge cases: empty array, undefined, or null
  if (!salesData || !Array.isArray(salesData) || salesData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] text-muted-foreground">
        <p>No sales data available</p>
      </div>
    );
  }

  // Ensure data is properly serialized (convert any non-serializable values)
  const chartData = salesData
    .map((item) => ({
      month: String(item.month || ""),
      totalSales: Number(item.totalSales || 0),
    }))
    // Sort chronologically (oldest to newest)
    // Parse MM-YY format and sort by year first, then month
    .sort((a, b) => {
      const [monthA, yearA] = a.month.split("-").map(Number);
      const [monthB, yearB] = b.month.split("-").map(Number);
      
      // Compare years first, then months
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
         <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>`$${value}` }
        />
        <Bar
        dataKey='totalSales'
        fill='currentColor'
        radius={[4, 4, 0, 0]}
        className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Charts;
