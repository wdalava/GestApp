import { useState } from "react";
import TransactionsForm from "../components/transactions/TransactionsForm";
import LastTransactions from "../components/LastTransactions";

function TransactionPage({ solde, onAdd, onUpdate, transactions, onDelete }) {
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  // function to start edition mode
  function handleStartEditing(transaction) {
    setTransactionToEdit(transaction);
  }

  // cancel edit function
  function cancelEdit() {
    setTransactionToEdit(null);
  }

  // SaveEdit function
  function saveEdit(updateTransactionData) {
    if (!transactionToEdit) return;

    onUpdate(transactionToEdit.id, updateTransactionData);
    setTransactionToEdit(null);
  }
  return (
    <section className="section-page">
      <div>
        <TransactionsForm
          handleCancel={cancelEdit}
          transactionToEdit={transactionToEdit}
          editionMode={transactionToEdit !== null}
          saveEdit={saveEdit}
          saveTransaction={onAdd}
          solde={solde}
        />
      </div>
      <div className="mt-8">
        <LastTransactions
          transactions={transactions}
          onDeleteTransaction={onDelete}
          onStartEditing={handleStartEditing}
        />
      </div>
    </section>
  );
}

export default TransactionPage;
