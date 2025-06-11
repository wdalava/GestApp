import { DollarSign, Edit3, PlusCircle, RefreshCcw, X } from "lucide-react";
import { formatDate, generateId } from "../../utils/utils";
import { useEffect, useState } from "react";
import categories from "/Users/macbookairm1/Desktop/Programme Apprentissage/Frontend/ReactProjects/FrelanceProjets/FinancialMAppProject/src/data/categories.js";

function TransactionsForm({
  editionMode,
  transactionToEdit,
  saveEdit,
  saveTransaction,
  handleCancel,
  solde,
}) {
  const [formData, setFormData] = useState(getInitialFormData);

  // update form when is editionMode
  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        type: transactionToEdit.type,
        amount: transactionToEdit.amount,
        category: transactionToEdit.category,
        description: transactionToEdit.description,
        date: transactionToEdit.date,
      });
    } else {
      setFormData(getInitialFormData());
    }
  }, [transactionToEdit]);

  // Get form éléments
  function getInitialFormData() {
    return {
      type: "",
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    };
  }

  // Reset Form
  function handleReset() {
    setFormData(getInitialFormData());
  }

  // Submit Form
  function handleSubmit(e) {
    e.preventDefault();

    // Verification of form elements
    if (
      formData.type === "" ||
      formData.category === "" ||
      formData.amount === ""
    ) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    // CORRECTION: Parenthèses corrigées
    if (parseFloat(formData.amount) <= 0) {
      alert("Le montant doit être supérieur à 0");
      return;
    }

    // if account amount is under than formData amount
    if (
      formData.type === "expenses" &&
      parseFloat(formData.amount) > parseFloat(solde)
    ) {
      alert("Le montant saisi dépasse votre solde disponible.");
      return;
    }

    // if editionMode
    if (editionMode) {
      const updateData = {
        type: formData.type,
        amount: formData.amount,
        category: formData.category,
        description: formData.description || "Pas de description",
        date: formData.date,
      };
      saveEdit(updateData);
      alert("Votre modification à bien été pris en compte !");
    } else {
      const newTransaction = {
        id: generateId(),
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description || "Pas de description",
        date: formData.date,
      };

      saveTransaction(newTransaction);
      alert("Votre transaction à bien été prise en compte !");
    }

    // reset Form if we are not in edition mode
    if (!editionMode) {
      handleReset();
    }
  }

  // Managing changes in the form
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // reset category when type change
      ...(name === "type" && { category: "" }),
    }));
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <div className="logo-page-bg">
            {editionMode ? (
              <Edit3 size={24} className="logo-page" />
            ) : (
              <PlusCircle size={24} className="logo-page" />
            )}
          </div>
          <h2 className="title-page">
            {editionMode ? "Modifier la transaction" : "Nouvelle transaction"}
          </h2>
        </div>
      </div>

      {/* Mode édition */}
      {editionMode && (
        <div>
          <p>
            <strong>Mode édition: </strong> Vous modifiez la transaction "
            {transactionToEdit?.description}" du{" "}
            {formatDate(new Date(transactionToEdit.date))}
          </p>
        </div>
      )}

      {/* add or Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction type */}
        <div>
          <label htmlFor="type" className="form-label">
            Type de transaction *
          </label>
          <select
            name="type"
            id="type"
            value={formData.type} // CORRECTION: formData au lieu de FormData
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Choisir le type de transaction</option>
            <option value="income">💰 Revenus</option>
            <option value="expenses">💸 Dépenses</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="form-label">
            Montant ($) *
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              className="form-input"
            />
          </div>
        </div>

        {/* Category (depend of the type) */}
        {formData.type && (
          <div>
            <label htmlFor="category" className="form-label">
              Catégorie *
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories[formData.type]?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Description */}
        <div>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Courses au supermarché"
            className="form-input-v2"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="form-label">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input-v2"
            required
          />
        </div>

        {/* Buttons */}
        <div className="sm:flex gap-4 space-y-4 sm:space-y-0">
          <button
            type="submit"
            className="flex items-center font-medium justify-center border rounded-lg py-2 px-3 transition-colors gap-2 w-full bg-green-500 hover:bg-green-600 text-white cursor-pointer"
          >
            {editionMode
              ? "✏️  Sauvegarder les modifications"
              : "➕  Ajouter la transaction"}
          </button>
          {editionMode ? (
            <button
              type="button"
              onClick={handleCancel}
              className="form-cancel-button"
            >
              <X /> Annuler
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="form-cancel-button"
            >
              <RefreshCcw size={18} /> Effacer
            </button>
          )}
        </div>
      </form>
    </>
  );
}
export default TransactionsForm;
