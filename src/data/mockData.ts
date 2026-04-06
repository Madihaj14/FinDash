export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

export const transactions: Transaction[] = [
  { id: "1", date: "2025-04-01", description: "Salary", amount: 435000, category: "Salary", type: "income" },
  { id: "2", date: "2025-04-02", description: "Grocery Store", amount: 7300, category: "Food", type: "expense" },
  { id: "3", date: "2025-04-03", description: "Netflix", amount: 649, category: "Entertainment", type: "expense" },
  { id: "4", date: "2025-04-04", description: "Freelance Project", amount: 100000, category: "Freelance", type: "income" },
  { id: "5", date: "2025-04-05", description: "Electric Bill", amount: 11900, category: "Utilities", type: "expense" },
  { id: "6", date: "2025-04-07", description: "Restaurant Dinner", amount: 5400, category: "Food", type: "expense" },
  { id: "7", date: "2025-04-08", description: "Gas Station", amount: 4600, category: "Transport", type: "expense" },
  { id: "8", date: "2025-04-10", description: "Online Course", amount: 2500, category: "Education", type: "expense" },
  { id: "9", date: "2025-04-12", description: "Dividend Payment", amount: 28400, category: "Investment", type: "income" },
  { id: "10", date: "2025-04-14", description: "Gym Membership", amount: 4200, category: "Health", type: "expense" },
  { id: "11", date: "2025-04-15", description: "Coffee Shop", amount: 1050, category: "Food", type: "expense" },
  { id: "12", date: "2025-04-17", description: "Internet Bill", amount: 6700, category: "Utilities", type: "expense" },
  { id: "13", date: "2025-04-18", description: "Clothing Store", amount: 10400, category: "Shopping", type: "expense" },
  { id: "14", date: "2025-04-20", description: "Side Gig", amount: 50000, category: "Freelance", type: "income" },
  { id: "15", date: "2025-04-22", description: "Pharmacy", amount: 2900, category: "Health", type: "expense" },
  { id: "16", date: "2025-03-01", description: "Salary", amount: 435000, category: "Salary", type: "income" },
  { id: "17", date: "2025-03-05", description: "Grocery Store", amount: 7900, category: "Food", type: "expense" },
  { id: "18", date: "2025-03-10", description: "Rent", amount: 125000, category: "Housing", type: "expense" },
  { id: "19", date: "2025-03-12", description: "Uber Rides", amount: 3500, category: "Transport", type: "expense" },
  { id: "20", date: "2025-03-15", description: "Freelance Work", amount: 67000, category: "Freelance", type: "income" },
  { id: "21", date: "2025-03-18", description: "Spotify", amount: 119, category: "Entertainment", type: "expense" },
  { id: "22", date: "2025-03-20", description: "Phone Bill", amount: 5400, category: "Utilities", type: "expense" },
  { id: "23", date: "2025-03-25", description: "Book Purchase", amount: 1700, category: "Education", type: "expense" },
];

export const balanceOverTime = [
  { month: "Nov", balance: 685000 },
  { month: "Dec", balance: 760000 },
  { month: "Jan", balance: 731000 },
  { month: "Feb", balance: 785000 },
  { month: "Mar", balance: 852000 },
  { month: "Apr", balance: 964000 },
];

export const categoryColors: Record<string, string> = {
  Food: "hsl(var(--chart-1))",
  Entertainment: "hsl(var(--chart-2))",
  Utilities: "hsl(var(--chart-3))",
  Transport: "hsl(var(--chart-4))",
  Health: "hsl(var(--chart-5))",
  Shopping: "hsl(var(--chart-1))",
  Education: "hsl(var(--chart-2))",
  Housing: "hsl(var(--chart-4))",
};
