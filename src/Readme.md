💸 GestApp — Application de gestion de finances personnelles

GestApp est une application web simple et intuitive permettant de suivre ses transactions, revenus, dépenses et statistiques financières. Elle est conçue avec React et offre une interface responsive pour une utilisation fluide sur desktop comme sur mobile.

🚀 Fonctionnalités

✅ Suivi des transactions (ajout, édition, suppression)
✅ Visualisation du solde de l'utilisateur
✅ Statistiques des revenus et dépenses
✅ Interface responsive avec sidebar dynamique
✅ Graphiques interactifs : barres et camemberts
✅ Simulations de données réalistes

🛠️ Stack technique

- React (Vite.js)
- Tailwind CSS pour le design
- UUID v4 pour l’identifiant unique des transactions
- Chart.js / Recharts pour les graphiques
- React Router pour la navigation
- Architecture basée sur des composants modulaires

🧱 Structure du projet & Étapes de développement

📦 Étape 1 – Structure initiale

Création de la structure de base du projet
Mise en place des composants principaux
Création des premières pages (Dashboard, Account, etc.)
Création des fichiers de simulation de données (data)

🗃️ Étape 2 – Préparation des données

Remplissage de data/categories.js avec des catégories types
Ajout de données fictives dans data/transactions.js pour les tests

⚙️ Étape 3 – Fonctions utilitaires

Création de utils.js :
generateId() : génère un identifiant unique avec uuidv4
formatDate() : formatte proprement les dates

👥 Étape 4 – Données utilisateurs et navigation

users.js : simulation d'utilisateurs
dataNavItems.js : structure dynamique de la sidebar

📚 Étape 5 – Sidebar

Composant Sidebar responsive et design amélioré
Gestion des états actifs, chevrons, responsive mobile
Intégration du nom et email utilisateur

🧾 Étape 6 – Formulaire de transaction

Composant TransactionForm
Ajout de transactions
UI soigné
Préparation pour l’édition future

📋 Étape 7 – Liste des transactions

Composant TransactionList
Affichage dynamique des transactions ajoutées
Design clair et épuré

📝 Étape 8 – Édition des transactions

Mise à jour de TransactionForm et TransactionList
Fonctionnalité d’édition complète (modifier les transactions existantes)

💼 Étape 9 – Solde du portefeuille

Composant Portefeuille
Page Account pour visualiser son solde global

📊 Étape 10 – Dashboard & Statistiques

Composants :

PieChartDepenses : répartition des dépenses
DernieresTransactions : transactions les plus récentes
BarsChartRevenusDepenses : évolution des finances
Intégration dans DashboardPage

📱 Étape 11 – Responsive global

Ajustement responsive de tous les composants
Comportement optimisé pour mobiles
Sidebar qui se ferme automatiquement sur clic/scroll

📌 À venir

Authentification utilisateur
Sauvegarde des données en base de données
Export PDF/CSV des transactions
Ajout de notifications et rappels

🧑‍💻 Auteur

DALL'AVA William
Passionné de data, de tech et d’optimisation.
