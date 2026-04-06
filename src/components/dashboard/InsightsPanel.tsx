import { useStore } from "@/store/useStore";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const InsightsPanel = () => {
  const transactions = useStore((s) => s.transactions);

  const insights = useMemo(() => {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const lastMonth = now.getMonth() === 0
      ? `${now.getFullYear() - 1}-12`
      : `${now.getFullYear()}-${String(now.getMonth()).padStart(2, "0")}`;

    const expensesByCategory: Record<string, number> = {};
    let thisMonthExpenses = 0;
    let lastMonthExpenses = 0;
    let thisMonthIncome = 0;

    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (t.type === "expense") {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        if (month === thisMonth) thisMonthExpenses += t.amount;
        if (month === lastMonth) lastMonthExpenses += t.amount;
      }
      if (t.type === "income" && month === thisMonth) thisMonthIncome += t.amount;
    });

    const topCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];
    const savingsRate = thisMonthIncome > 0
      ? ((thisMonthIncome - thisMonthExpenses) / thisMonthIncome * 100).toFixed(1)
      : "0";
    const changeVsLast = lastMonthExpenses > 0
      ? (((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100).toFixed(1)
      : null;

    return { topCategory, thisMonthExpenses, lastMonthExpenses, savingsRate, changeVsLast };
  }, [transactions]);

  const cards = [
    {
      icon: AlertTriangle,
      title: "Top Spending",
      value: insights.topCategory ? `${insights.topCategory[0]} — ₹${insights.topCategory[1].toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "N/A",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: insights.changeVsLast && parseFloat(insights.changeVsLast) > 0 ? TrendingUp : TrendingDown,
      title: "vs Last Month",
      value: insights.changeVsLast
        ? `${parseFloat(insights.changeVsLast) > 0 ? "+" : ""}${insights.changeVsLast}%`
        : "N/A",
      color: insights.changeVsLast && parseFloat(insights.changeVsLast) > 0 ? "text-destructive" : "text-success",
      bgColor: insights.changeVsLast && parseFloat(insights.changeVsLast) > 0 ? "bg-destructive/10" : "bg-success/10",
    },
    {
      icon: TrendingUp,
      title: "Savings Rate",
      value: `${insights.savingsRate}%`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="glass-card p-5">
      <h3 className="font-heading font-semibold text-lg mb-4">Insights</h3>
      <div className="space-y-4">
        {cards.map((c) => (
          <div key={c.title} className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${c.bgColor}`}>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{c.title}</p>
              <p className="font-semibold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
