import { useStore } from "@/store/useStore";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useMemo } from "react";

const IncomeExpenseCards = () => {
  const transactions = useStore((s) => s.transactions);

  const { income, expense } = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense };
  }, [transactions]);

  return (
    <div className="space-y-3">
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-success/10 shrink-0">
          <TrendingUp className="h-5 w-5 text-success" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Income</p>
          <p className="text-xl font-heading font-bold">
            ₹{income.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-destructive/10 shrink-0">
          <TrendingDown className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Expenses</p>
          <p className="text-xl font-heading font-bold">
            ₹{expense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseCards;
