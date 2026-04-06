import { useStore } from "@/store/useStore";
import { useMemo } from "react";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

const QuickInsights = () => {
  const transactions = useStore((s) => s.transactions);

  const insights = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};
    let totalExpenses = 0;
    let totalIncome = 0;

    transactions.forEach((t) => {
      if (t.type === "expense") {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        totalExpenses += t.amount;
      } else {
        totalIncome += t.amount;
      }
    });

    const topCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];
    const savingsRate = totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
      : "0";

    return [
      {
        icon: AlertTriangle,
        label: "Top Spending",
        value: topCategory ? topCategory[0] : "N/A",
        sub: topCategory ? `₹${topCategory[1].toLocaleString("en-IN")}` : "",
        colorClass: "text-accent",
        bgClass: "bg-accent/10",
      },
      {
        icon: TrendingUp,
        label: "Savings Rate",
        value: `${savingsRate}%`,
        sub: "of income saved",
        colorClass: "text-primary",
        bgClass: "bg-primary/10",
      },
      {
        icon: totalExpenses > totalIncome * 0.7 ? TrendingDown : TrendingUp,
        label: "Expense Ratio",
        value: `${totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(0) : 0}%`,
        sub: "of income spent",
        colorClass: totalExpenses > totalIncome * 0.7 ? "text-destructive" : "text-success",
        bgClass: totalExpenses > totalIncome * 0.7 ? "bg-destructive/10" : "bg-success/10",
      },
    ];
  }, [transactions]);

  return (
    <div className="glass-card p-4">
      <h3 className="font-heading font-semibold text-sm mb-3">Quick Insights</h3>
      <div className="space-y-3">
        {insights.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${item.bgClass} shrink-0`}>
              <item.icon className={`h-4 w-4 ${item.colorClass}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-semibold text-sm truncate">{item.value}</p>
              {item.sub && <p className="text-xs text-muted-foreground">{item.sub}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickInsights;
