import { BarChart, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { formatAmount, formatDate } from "../../utils/utils";

function TransactionsList({ transactions = [], onDeleteTransaction }) {
  return (
    <>
      <div className="sm:flex items-center justify-between mb-4 space-y-2 sm:space-x-3 sm:space-y-0">
        <div className="flex gap-2 items-center">
          <div className="logo-page-bg">
            <BarChart size={24} className="logo-page" />
          </div>
          <h2 className="text-[1.10rem] sm:text-xl font-bold text-gray-800">
            Historique des transactions
          </h2>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {transactions.length} transaction{transactions.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Transactions list */}
      <div className="max-h-96 overflow-y-auto space-y-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className={`sm:p-4 py-2 px-1 rounded-lg border-l-4 transition-all hover:shadow-md ${
              t.type === "income"
                ? "border-l-green-500 hover:bg-green-100 bg-green-50"
                : "border-l-red-500 bg-red-50 hover:bg-red-100"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* --- left elements - principal information --- */}

              {/* trending sign for transaction type */}
              <div className="flex items-center sm:gap-3 gap-2">
                <div
                  className={`p-2 rounded-full ${
                    t.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.type === "income" ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                </div>

                {/* Transaction type, desc, date */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">
                      {t.category}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        t.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.type === "income" ? "Revenus" : "Dépenses"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(t.date)}
                  </p>
                </div>
              </div>

              {/* right éléments - Amount and Actions */}
              <div className="flex sm:flex-row flex-col items-center gap-2">
                <div
                  className={`sm:text-lg font-semibold flex items-center ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} {formatAmount(t.amount)}
                </div>

                {/* Button action */}
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with statistiques */}
      {transactions.length > 0 && (
        <div className="border-t mt-4 border-gray-200 pt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Revenus : {transactions.filter((t) => t.type === "income").length}
            </span>
            <span>
              Dépenses :{" "}
              {transactions.filter((t) => t.type === "expenses").length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionsList;
