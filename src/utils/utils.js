import { v4 as uuidv4 } from "uuid";

// Fonction pour reformater la date
export function formatDate(dateString) {
  // récuperons la date
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-Fr", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// fonction pour generer un id unique pour chaque transaction
export function generateId() {
  return uuidv4();
}

// Fonction pour reformater le montant
export function formatAmount(amount) {
  return (
    Number(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " $"
  );
}

// function to personnalise percentage to add
export function formatPercentageChange(value) {
  const isPositive = value >= 0;
  const arrow = isPositive ? "▲" : "▼";
  const color = isPositive ? "text-green-500" : "text-red-500";
  const formatted = Math.abs(value).toFixed(1);

  return { arrow, color, formatted };
}

export function formatPercentageChangeExpense(value) {
  const isPositive = value <= 0;
  const arrow = isPositive ? "▼" : "▲";
  const color = isPositive ? "text-green-500" : "text-red-500";
  const formatted = Math.abs(value).toFixed(1);

  return { arrow, color, formatted };
}

// Calculate percentage
export function calculatePercentageChange(today, yesterday) {
  if (yesterday === 0) {
    if (today === 0) return 0;
    return 100;
  }
  return Number(((today - yesterday) / yesterday) * 100).toFixed(2);
}
