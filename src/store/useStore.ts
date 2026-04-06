import { create } from "zustand";
import { Transaction, transactions as mockTransactions } from "@/data/mockData";

type Role = "admin" | "viewer";
type SortField = "date" | "amount";
type SortOrder = "asc" | "desc";

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: "all" | "income" | "expense";
  setFilterType: (f: "all" | "income" | "expense") => void;
  sortField: SortField;
  sortOrder: SortOrder;
  setSort: (field: SortField) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  role: "admin",
  setRole: (role) => set({ role }),
  transactions: mockTransactions,
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  filterType: "all",
  setFilterType: (filterType) => set({ filterType }),
  sortField: "date",
  sortOrder: "desc",
  setSort: (field) => {
    const { sortField, sortOrder } = get();
    if (sortField === field) {
      set({ sortOrder: sortOrder === "asc" ? "desc" : "asc" });
    } else {
      set({ sortField: field, sortOrder: "desc" });
    }
  },
  addTransaction: (t) =>
    set((state) => ({
      transactions: [
        { ...t, id: crypto.randomUUID() },
        ...state.transactions,
      ],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
  activeTab: "dashboard",
  setActiveTab: (activeTab) => set({ activeTab }),
}));
