import Portefeuille from "../components/Portefeuille";
import { formatAmount } from "../utils/utils";

function AccountPage({ solde }) {
  return (
    <section className="section-page">
      <Portefeuille solde={solde} />
      {/* Statistiques résumées */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Résumé du compte
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stats-container">
            <p className="text-2xl font-bold text-gray-800">
              {formatAmount(Math.abs(solde))}
            </p>
            <p className="stats-title">Valeur absolue</p>
          </div>
          <div className="stats-container">
            <p className="text-2xl font-bold text-blue-500">
              {new Date().toLocaleDateString("fr-FR", { month: "long" })}
            </p>
            <p className="stats-title">Mois actuel</p>
          </div>
          <div className="stats-container">
            <p className="text-2xl font-bold text-purple-500">
              {new Date().getFullYear()}
            </p>
            <p className="stats-title">Année</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountPage;
