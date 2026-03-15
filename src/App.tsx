import { useState, useMemo } from "react";
import type { Transaction } from "./types";
import { dummyTransactions } from "./data/dummy";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import CategoryFilter from "./components/CategoryFilter";
import PieChartPanel from "./components/PieChartPanel";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);
  const [filterCategory, setFilterCategory] = useState<string>("Tümü");

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const expensePieData = useMemo(() => {
    const grouped = transactions
      .filter((t) => t.type === "expense")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const incomePieData = useMemo(() => {
    const grouped = transactions
      .filter((t) => t.type === "income")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filterCategory === "Tümü") return transactions;
    return transactions.filter((t) => t.category === filterCategory);
  }, [transactions, filterCategory]);

  const filteredExpensePieData = useMemo(() => {
    if (filterCategory === "Tümü") return expensePieData;
    return expensePieData.filter((d) => d.name === filterCategory);
  }, [expensePieData, filterCategory]);

  const filteredIncomePieData = useMemo(() => {
    if (filterCategory === "Tümü") return incomePieData;
    return incomePieData.filter((d) => d.name === filterCategory);
  }, [incomePieData, filterCategory]);

  const filteredExpenseTotal = useMemo(
    () => filteredExpensePieData.reduce((sum, d) => sum + d.value, 0),
    [filteredExpensePieData]
  );

  const filteredIncomeTotal = useMemo(
    () => filteredIncomePieData.reduce((sum, d) => sum + d.value, 0),
    [filteredIncomePieData]
  );

  const handleAdd = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Header balance={balance} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Özet Kartları */}
        <div className="mb-6">
          <SummaryCards
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
          />
        </div>

        {/* Ana İki Kolon Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sol Panel: Form */}
          <div className="w-full md:w-[35%] flex flex-col gap-4">
            <TransactionForm onAdd={handleAdd} />
          </div>

          {/* Sağ Panel: Filtre + Grafik + Liste */}
          <div className="w-full md:w-[65%] flex flex-col gap-4">
            <div className="card-no-hover px-5 py-4">
              <CategoryFilter selected={filterCategory} onChange={setFilterCategory} />
            </div>
            <PieChartPanel
              expensePieData={filteredExpensePieData}
              incomePieData={filteredIncomePieData}
              totalExpense={filteredExpenseTotal}
              totalIncome={filteredIncomeTotal}
            />
            <TransactionList transactions={filteredTransactions} />
          </div>
        </div>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "16px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "13px",
        }}
      >
        © 2026 FinansTracker — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

export default App;
