import { BadgeDollarSignIcon, BarChart, Home, Wallet } from "lucide-react";

export default [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    logo: Home,
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/Historiques",
    logo: BarChart,
  },
  {
    id: "transactions",
    label: "Transactions",
    path: "/transactions",
    logo: BadgeDollarSignIcon,
  },
  {
    id: "portefeuille",
    label: "Portfeuille",
    path: "/wallet",
    logo: Wallet,
  },
];
