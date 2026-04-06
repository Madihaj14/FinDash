import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Transaction } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

const categories = ["Food", "Entertainment", "Utilities", "Transport", "Health", "Shopping", "Education", "Housing", "Salary", "Freelance", "Investment"];

interface Props {
  editing: Transaction | null;
  onClose: () => void;
}

const TransactionForm = ({ editing, onClose }: Props) => {
  const { addTransaction, updateTransaction } = useStore();
  const [form, setForm] = useState({
    description: editing?.description || "",
    amount: editing?.amount?.toString() || "",
    category: editing?.category || "Food",
    type: editing?.type || "expense" as "income" | "expense",
    date: editing?.date || new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    const data = {
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type as "income" | "expense",
      date: form.date,
    };
    if (editing) {
      updateTransaction(editing.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-semibold">{editing ? "Edit" : "Add"} Transaction</h4>
        <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "income" | "expense" })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {editing ? "Update" : "Add"} Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
