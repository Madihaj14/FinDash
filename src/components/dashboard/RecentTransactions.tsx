import { useStore } from "@/store/useStore";
import { useMemo } from "react";

const RecentTransactions = () => {
  const transactions = useStore((s) => s.transactions);

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [transactions]);

  return (
    <div className="glass-card p-4">
      <h3 className="font-heading font-semibold text-sm mb-3">Recent Transactions</h3>
      <div className="space-y-2.5">
        {recent.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{t.description}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
            </div>
            <span className={`text-sm font-semibold shrink-0 ${t.type === "income" ? "text-success" : "text-destructive"}`}>
              {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
