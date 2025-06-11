import { Edit3, Trash2 } from "lucide-react";
import { formatAmount } from "../utils/utils";

function LastTransactions({
  transactions = [],
  onDeleteTransaction,
  onStartEditing,
}) {
  // get last transactions
  const lastTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // case when we haven't transactions
  if (lastTransactions.length === 0) {
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
        {lastTransactions.map((t) => (
          <li key={t.id} className="py-3 flex justify-between items-center">
            <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
              <span className="font-medium text-gray-800">{t.category}</span>
              <span className="text-sm text-gray-500 mt-1">{t.date}</span>
              <span className="mt-1 text-xs text-gray-400">
                {t.description}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold ${
                  t.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {t.type === "income" ? "+" : "-"} {formatAmount(t.amount)}
              </span>
              {/* Buttons */}
              <div className="flex gap-1">
                {onStartEditing && (
                  <button
                    onClick={() => onStartEditing(t)}
                    title="Modifier"
                    className="sm:p-2 p-0.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                )}
                {onDeleteTransaction && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Êtes-vous sûr de vouloir supprimer cette transaction ?"
                        )
                      ) {
                        onDeleteTransaction(t.id);
                      }
                    }}
                    className="sm:p-2 p-0.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastTransactions;
