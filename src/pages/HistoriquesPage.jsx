import TransactionsList from "../components/transactions/TransactionsList";

function HistoriquesPage({ transactions, onDelete }) {
  return (
    <section className="section-page">
      <TransactionsList
        transactions={transactions}
        onDeleteTransaction={onDelete}
      />
    </section>
  );
}

export default HistoriquesPage;
