import { useStore } from "@/store/useStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

const AppHeader = () => {
  const { role, setRole, activeTab, setActiveTab } = useStore();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 header-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shadow-soft">
            <span className="text-primary-foreground font-heading font-bold text-sm">F</span>
          </div>
          <h1 className="font-heading font-bold text-lg hidden sm:block">FinDash</h1>
        </div>

        <nav className="flex gap-1 bg-muted/50 rounded-xl p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`gap-1.5 rounded-lg ${activeTab === tab.id ? "shadow-soft" : ""}`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="text-xs text-muted-foreground hidden sm:inline">Role:</span>
          <Select value={role} onValueChange={(v) => setRole(v as "admin" | "viewer")}>
            <SelectTrigger className="w-28 h-8 text-xs rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
