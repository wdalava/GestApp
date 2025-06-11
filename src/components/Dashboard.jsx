import { Home } from "lucide-react";
import {
  formatAmount,
  formatPercentageChange,
  formatPercentageChangeExpense,
} from "../utils/utils";

function Dashboard({
  solde,
  incomeTotal,
  expenseTotal,
  soldePercent,
  expensePercent,
  incomePercent,
}) {
  const soldeStats = formatPercentageChange(soldePercent);
  const expenseStats = formatPercentageChangeExpense(expensePercent);
  const incomeStats = formatPercentageChange(incomePercent);
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="logo-page-bg">
          <Home size={24} className="logo-page" />
        </div>
        <h2 className="title-page">Dashboard</h2>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Solde */}
        <div className="kpi-container">
          <h3 className="kpi-title">Solde Total</h3>
          <p className="kpi-amount text-green-500">{formatAmount(solde)}</p>
          <p className={`kpi-comparaison ${soldeStats.color}`}>
            {soldeStats.arrow} {soldeStats.formatted} %
          </p>
        </div>

        {/* expenses */}
        <div className="kpi-container">
          <h3 className="kpi-title">Dépenses Totales</h3>
          <p className="kpi-amount text-red-500">
            {formatAmount(expenseTotal)}
          </p>
          <p className={`kpi-comparaison ${expenseStats.color}`}>
            {expenseStats.arrow} {expenseStats.formatted} %
          </p>
        </div>

        {/* incomes */}
        <div className="kpi-container">
          <h3 className="kpi-title">Revenus Totaux</h3>
          <p className="kpi-amount text-green-500">
            {formatAmount(incomeTotal)}
          </p>
          <p className={`kpi-comparaison ${incomeStats.color}`}>
            {incomeStats.arrow} {incomeStats.formatted} %
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
