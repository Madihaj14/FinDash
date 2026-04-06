import { useStore } from "@/store/useStore";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { balanceOverTime } from "@/data/mockData";

const HeroBalanceCard = () => {
  const transactions = useStore((s) => s.transactions);

  const { balance, weekChange } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Simulate weekly change from last few transactions
    const recent = transactions
      .slice(0, 5)
      .reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);

    return { balance: totalIncome - totalExpenses, weekChange: recent };
  }, [transactions]);

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1 z-10 relative">
          <p className="text-sm text-muted-foreground font-medium">Total Balance</p>
          <p className="text-4xl font-heading font-bold tracking-tight">
            ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
              <TrendingUp className="h-3 w-3" />
              {weekChange >= 0 ? "+" : ""}₹{Math.abs(weekChange).toLocaleString("en-IN")}
            </div>
            <span className="text-xs text-muted-foreground">this week</span>
          </div>
        </div>
        <div className="w-32 h-16 opacity-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceOverTime}>
              <defs>
                <linearGradient id="heroSparkline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#heroSparkline)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HeroBalanceCard;
