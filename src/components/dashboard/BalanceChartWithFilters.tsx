import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { balanceOverTime } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const timeFilters = ["1M", "3M", "6M", "1Y"] as const;

const BalanceChartWithFilters = () => {
  const [activeFilter, setActiveFilter] = useState<string>("6M");

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg">Balance Trend</h3>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
          {timeFilters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={activeFilter === f ? "default" : "ghost"}
              className="h-7 px-3 text-xs rounded-md"
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceOverTime}>
            <defs>
              <linearGradient id="balanceGradientMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: 13,
                backdropFilter: "blur(10px)",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Balance"]}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill="url(#balanceGradientMain)"
              dot={{ fill: "hsl(var(--primary))", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChartWithFilters;
