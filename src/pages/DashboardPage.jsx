import Dashboard from "../components/Dashboard";
import IncomsVsExpenses from "../components/IncomsVsExpenses";
import LastFivesTransactions from "../components/LastFivesTransactions";
import PieChartExpenses from "../components/PieChartExpenses";

function DashboardPage({
  solde,
  totalExpenses,
  totalIncomes,
  incomePercent,
  expensePercent,
  soldePercent,
  incomeExpensesPerDay,
  expensesPerCategory,
  transactions,
}) {
  return (
    <section className="section-page">
      <Dashboard
        solde={solde}
        expenseTotal={totalExpenses}
        incomeTotal={totalIncomes}
        incomePercent={incomePercent}
        expensePercent={expensePercent}
        soldePercent={soldePercent}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <IncomsVsExpenses data={incomeExpensesPerDay} />
        <PieChartExpenses data={expensesPerCategory} />
      </div>
      <div className="gap-6 mt-8">
        <LastFivesTransactions transactions={transactions} />
      </div>
    </section>
  );
}

export default DashboardPage;
