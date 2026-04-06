import { useStore } from "@/store/useStore";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const SummaryCards = () => {
  const transactions = useStore((s) => s.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const cards = [
    {
      label: "Total Balance",
      value: balance,
      icon: Wallet,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      colorClass: "text-success",
      bgClass: "bg-success/10",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      colorClass: "text-destructive",
      bgClass: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="glass-card p-5 flex items-center gap-4 transition-all hover:shadow-soft-lg"
        >
          <div className={`p-3 rounded-xl ${card.bgClass}`}>
            <card.icon className={`h-5 w-5 ${card.colorClass}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-2xl font-heading font-semibold">
              ₹{card.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
