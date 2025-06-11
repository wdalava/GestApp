import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { formatAmount, formatDate } from "../utils/utils";

function Portefeuille({ solde }) {
  const montant = parseFloat(solde);
  const getSoldeStyle = (amount) => {
    if (amount > 0) {
      return {
        color: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: TrendingUp,
        status: "Positif",
      };
    } else if (amount < 0) {
      return {
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: TrendingDown,
        status: "Négatif",
      };
    } else {
      return {
        color: "text-gray-500",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        icon: DollarSign,
        status: "Neutre",
      };
    }
  };

  const soldeStyle = getSoldeStyle(montant);
  const StatusIcon = soldeStyle.icon;
  return (
    <>
      <div
        className={`bg-white rounded-2xl shadow-lg border-2 p-4 sm:p-6 w-full max-w-md mx-auto transition-all duration-300 hover:shadow-xl ${soldeStyle.borderColor}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
              <DollarSign size={24} className="sm:w-7 sm:h-7 text-blue-500" />
            </div>
            <h2 className="title-page">Mon Portefeuille</h2>
          </div>

          {/* Status indicator */}
          <div className={`p-2 rounded-full ${soldeStyle.bgColor}`}>
            <StatusIcon size={20} className={`${soldeStyle.color}`} />
          </div>
        </div>

        {/* Solde */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-2">Solde actuel</p>
          <p
            className={`text-2xl sm:text-4xl font-bold ${soldeStyle.color} mb-2`}
          >
            {formatAmount(montant)}
          </p>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${soldeStyle.bgColor} ${soldeStyle.color}`}
          >
            {soldeStyle.status}
          </span>
        </div>

        {/* Informations */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Dernière mise à jour</span>
            <span className="text-gray-800 font-medium">
              {formatDate(new Date())}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portefeuille;
