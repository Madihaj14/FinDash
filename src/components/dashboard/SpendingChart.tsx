import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useStore } from "@/store/useStore";
import { useMemo } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#7C5CFC",
  Utilities: "#A78BFA",
  Food: "#F472B6",
  Shopping: "#FB7185",
  Transport: "#38BDF8",
  Health: "#34D399",
  Education: "#FBBF24",
  Entertainment: "#C084FC",
};
const FALLBACK_COLOR = "#94A3B8";

const SpendingChart = () => {
  const transactions = useStore((s) => s.transactions);

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: +value.toFixed(2) }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="glass-card p-5">
      <h3 className="font-heading font-semibold text-lg mb-4">Spending by Category</h3>
      <div className="h-64 flex items-center">
        <ResponsiveContainer width="55%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || FALLBACK_COLOR}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: 13,
                backdropFilter: "blur(10px)",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Spent"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: CATEGORY_COLORS[item.name] || FALLBACK_COLOR }}
              />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium ml-auto">₹{item.value.toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;
