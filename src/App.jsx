import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import menuItems from "./data/menuItems";
import TransactionPage from "./pages/TransactionPage";
import { useEffect, useState } from "react";
import transactionsStore from "./data/transactions";
import HistoriquesPage from "./pages/HistoriquesPage";
import AccountPage from "./pages/AccountPage";
import DashboardPage from "./pages/DashboardPage";
import { calculatePercentageChange } from "./utils/utils";

function App() {
  // --- global states ---
  const [transactions, setTransactions] = useState(transactionsStore);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Total expenses - expenses percent
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesPercent, setExpensesPercent] = useState(0);

  // Total incomes - incomes percent
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [incomesPercent, setIncomesPercent] = useState(0);

  // solde change
  const [soldeChange, setSoldeChange] = useState(0);

  // set kpis using useEffect
  useEffect(() => {
    let expensesTotal = 0;
    let incomesTotal = 0;

    transactions.forEach((t) => {
      const amount = parseFloat(t.amount);
      if (t.type === "income") {
        incomesTotal += amount;
      } else {
        expensesTotal += amount;
      }
    });

    setTotalExpenses(expensesTotal);
    setTotalIncomes(incomesTotal);
  }, [transactions]);

  // === Global functions ===

  // --- TransactionsFormPage ---

  // add transaction function
  function handleAddTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
  }

  // update transaction function
  function handleUpdateTransaction(id, updateData) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updateData } : t))
    );
  }

  // --- TransactionsListPage ---

  // delete transaction function
  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // --- AccountPage ---

  // solde account
  const solde = transactions.reduce((total, t) => {
    return t.type === "income"
      ? total + Number(t.amount)
      : total - Number(t.amount);
  }, 0);

  // --- DashboardPage ---

  // set comparaison using useffect
  useEffect(() => {
    // today Date
    const today = new Date().toISOString().split("T")[0];

    // Yesterday Date
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    // today transactions
    const todayTransactions = transactions.filter((t) => t.date === today);

    // yesterday transactions
    const yesterdayTransactions = transactions.filter(
      (t) => t.date === yesterday
    );

    // today income
    const todayIncomes = todayTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // yesterday income
    const yesterdayIncomes = yesterdayTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // today expenses
    const todayExpenses = todayTransactions
      .filter((t) => t.type === "expenses")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // yesterday expenes
    const yesterdayExpenses = yesterdayTransactions
      .filter((t) => t.type === "expenses")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // today solde
    const todaySolde = todayIncomes - todayExpenses;

    // yesterday solde
    const yesterdaySolde = yesterdayIncomes - yesterdayExpenses;

    // apply
    setExpensesPercent(
      calculatePercentageChange(todayExpenses, yesterdayExpenses)
    );
    setIncomesPercent(
      calculatePercentageChange(todayIncomes, yesterdayIncomes)
    );
    setSoldeChange(calculatePercentageChange(todaySolde, yesterdaySolde));
  }, [transactions]);

  // Income - Expenses per day
  function getIncomeExpensesPerDay(transactions) {
    const grouped = {};

    transactions.forEach((t) => {
      if (!grouped[t.date]) {
        grouped[t.date] = {
          income: 0,
          expenses: 0,
        };
      }
      grouped[t.date][t.type] += Number(t.amount);
    });

    const sorted = Object.entries(grouped)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, values]) => ({
        date,
        incomes: values.income,
        expenses: values.expenses,
      }));

    return sorted;
  }

  // function EXpensesPerCategory
  function getExpensesPerCategory(transactions) {
    const grouped = {};

    transactions.forEach((t) => {
      if (t.type === "expenses") {
        const cat = t.category || "Inconnue";
        if (!grouped[cat]) {
          grouped[cat] = 0;
        }
        grouped[cat] += Number(t.amount);
      }
    });

    return Object.entries(grouped).map(([category, total]) => ({
      categorie: category,
      value: total,
    }));
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`flex-1 w-full overflow-x-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-16" : "ml-52 sm:ml-64"
        }`}
      >
        <Routes>
          {menuItems.map(
            (i) =>
              i.id === "transactions" && (
                <Route
                  key={i.id}
                  path={i.path}
                  element={
                    <TransactionPage
                      onAdd={handleAddTransaction}
                      solde={solde}
                      transactions={transactions}
                      onDelete={handleDelete}
                      onUpdate={handleUpdateTransaction}
                    />
                  }
                />
              )
          )}
          {menuItems.map(
            (i) =>
              i.id === "analytics" && (
                <Route
                  key={i.id}
                  path={i.path}
                  element={
                    <HistoriquesPage
                      transactions={transactions}
                      onDelete={handleDelete}
                    />
                  }
                />
              )
          )}
          {menuItems.map(
            (i) =>
              i.id === "portefeuille" && (
                <Route
                  key={i.id}
                  path={i.path}
                  element={<AccountPage solde={solde} />}
                />
              )
          )}
          {menuItems.map(
            (i) =>
              i.id === "dashboard" && (
                <Route
                  key={i.id}
                  path={i.path}
                  element={
                    <DashboardPage
                      solde={solde}
                      totalExpenses={totalExpenses}
                      totalIncomes={totalIncomes}
                      incomePercent={incomesPercent}
                      expensePercent={expensesPercent}
                      soldePercent={soldeChange}
                      incomeExpensesPerDay={getIncomeExpensesPerDay(
                        transactions
                      )}
                      expensesPerCategory={getExpensesPerCategory(transactions)}
                      transactions={transactions}
                    />
                  }
                />
              )
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
