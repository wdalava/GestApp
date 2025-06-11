import { formatAmount } from "../utils/utils";

function LastFivesTransactions({ transactions = [] }) {
  // get last five transactions
  const lastFive = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // case when we haven't transactions
  if (lastFive.length === 0) {
    return (
      <div className="graphic-container">
        <h3 className="graphic-container-title">Dernières Transactions</h3>
        <p className="text-center py-4 text-gray-500">
          Aucune transactions disponible
        </p>
      </div>
    );
  }

  return (
    <div className="graphic-container">
      <h3 className="graphic-container-title">Dernières Transactions</h3>
      <ul className="divide-y">
        {lastFive.map((t) => (
          <li key={t.id} className="py-3 flex justify-between items-center">
            <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
              <span className="font-medium text-gray-800">{t.category}</span>
              <span className="text-sm text-gray-500 mt-1">{t.date}</span>
              <span className="mt-1 text-xs text-gray-400">
                {t.description}
              </span>
            </div>
            <span
              className={`font-semibold ${
                t.type === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {t.type === "income" ? "+" : "-"} {formatAmount(t.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastFivesTransactions;
