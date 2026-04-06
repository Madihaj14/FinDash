import AppHeader from "@/components/layout/AppHeader";
import GreetingSection from "@/components/dashboard/GreetingSection";
import HeroBalanceCard from "@/components/dashboard/HeroBalanceCard";
import BalanceChartWithFilters from "@/components/dashboard/BalanceChartWithFilters";
import QuickInsights from "@/components/dashboard/QuickInsights";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import IncomeExpenseCards from "@/components/dashboard/IncomeExpenseCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import TransactionList from "@/components/transactions/TransactionList";
import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

const Index = () => {
  const activeTab = useStore((s) => s.activeTab);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <GreetingSection />

              {/* 3-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1.5fr] gap-5">
                {/* Left Panel */}
                <div className="space-y-4 order-2 lg:order-1">
                  <QuickInsights />
                  <RecentTransactions />
                </div>

                {/* Main Content */}
                <div className="space-y-5 order-1 lg:order-2">
                  <HeroBalanceCard />
                  <BalanceChartWithFilters />
                </div>

                {/* Right Panel */}
                <div className="space-y-4 order-3">
                  <IncomeExpenseCards />
                  <SpendingChart />
                  <InsightsPanel />
                </div>
              </div>

              {/* Full-width transactions table */}
              <div className="mt-6">
                <h3 className="font-heading font-semibold text-lg mb-4">All Transactions</h3>
                <TransactionList />
              </div>
            </motion.div>
          )}
          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <TransactionList />
            </motion.div>
          )}
          {activeTab === "insights" && (
            <motion.div
              key="insights"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <InsightsPanel />
              <SpendingChart />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
