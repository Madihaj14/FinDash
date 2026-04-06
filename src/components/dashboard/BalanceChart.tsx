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

const BalanceChart = () => (
  <div className="glass-card p-5">
    <h3 className="font-heading font-semibold text-lg mb-4">Balance Over Time</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={balanceOverTime}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
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
            fill="url(#balanceGradient)"
            dot={{ fill: "hsl(var(--primary))", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BalanceChart;
