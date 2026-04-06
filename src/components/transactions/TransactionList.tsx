import { useStore } from "@/store/useStore";
import { useMemo, useState } from "react";
import { Search, ArrowUpDown, Plus, Trash2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";
import { Transaction } from "@/data/mockData";

const TransactionList = () => {
  const {
    transactions, searchQuery, setSearchQuery,
    filterType, setFilterType, sortField, sortOrder, setSort,
    role, deleteTransaction,
  } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filterType !== "all") list = list.filter((t) => t.type === filterType);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      const mult = sortOrder === "asc" ? 1 : -1;
      if (sortField === "date") return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mult * (a.amount - b.amount);
    });
    return list;
  }, [transactions, filterType, searchQuery, sortField, sortOrder]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "income", "expense"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filterType === f ? "default" : "outline"}
              onClick={() => setFilterType(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={() => setSort(sortField === "date" ? "amount" : "date")}>
            <ArrowUpDown className="h-4 w-4 mr-1" />
            {sortField === "date" ? "Date" : "Amount"}
          </Button>
          {role === "admin" && (
            <Button size="sm" onClick={() => { setEditingTx(null); setShowForm(true); }}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          )}
        </div>
      </div>

      {showForm && (
        <TransactionForm
          editing={editingTx}
          onClose={() => { setShowForm(false); setEditingTx(null); }}
        />
      )}

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Description</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-right p-3 font-medium">Amount</th>
                {role === "admin" && <th className="p-3 w-20" />}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-3 text-muted-foreground">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="p-3 font-medium">{t.description}</td>
                    <td className="p-3 hidden sm:table-cell">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                        {t.category}
                      </span>
                    </td>
                    <td className={`p-3 text-right font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                      {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    {role === "admin" && (
                      <td className="p-3">
                        <div className="flex gap-1 justify-end">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => { setEditingTx(t); setShowForm(true); }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-destructive"
                            onClick={() => deleteTransaction(t.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
