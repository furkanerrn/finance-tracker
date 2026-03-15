<h1 align="center">
  <img src="screenshots/dashboard.png" alt="FinansTracker Banner" width="100%"/>
  <br/><br/>
  FinansTracker
</h1>

<p align="center">
  A modern personal finance management app built with React, TypeScript &amp; Vite.
  <br/>
  Track your income, expenses, and savings — all in one clean dark-themed dashboard.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Recharts-2-22C55E?style=flat-square" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer" />
</p>

---

## Features

- **Income & Expense Tracking** — Add transactions with description, amount, category, and date
- **Real-time Summary Cards** — Total income, total expense, net balance, and savings rate at a glance
- **Monthly Bar Chart** — Last 6 months income vs. expense comparison
- **Pie Chart Analytics** — Category-level breakdown of spending and income
- **Category Filter** — Filter all views by a specific category instantly
- **Edit & Delete** — Full CRUD — modify or remove any transaction via an animated modal
- **Data Persistence** — All data is saved to `localStorage`, survives page refreshes
- **Smooth Animations** — Powered by Framer Motion throughout the entire UI
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## Screenshots

### Full Dashboard
![Full Dashboard](screenshots/dashboard.png)

### Monthly Income & Expense Chart
![Monthly Chart](screenshots/monthly_chart.png)

### Transaction List — Edit & Delete
![Transaction List](screenshots/transactions.png)

### Add New Transaction
![Transaction Form](screenshots/form.png)

### Mobile View
![Mobile View](screenshots/mobile.png)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 + CSS Variables |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |
| Persistence | localStorage API |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/furkanerrn/finance-tracker.git
cd finance-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Sticky header with live balance chip
│   ├── SummaryCards.tsx     # 4 animated metric cards
│   ├── MonthlyChart.tsx     # 6-month income vs. expense bar chart
│   ├── TransactionForm.tsx  # Add new transaction form
│   ├── CategoryFilter.tsx   # Horizontal category filter pills
│   ├── PieChartPanel.tsx    # Donut chart with legend
│   ├── TransactionList.tsx  # Scrollable list with edit/delete actions
│   └── EditModal.tsx        # Animated edit modal
├── data/
│   └── dummy.ts             # Seed data & category color maps
├── types/
│   └── index.ts             # TypeScript interfaces
└── utils/
    └── format.ts            # Currency & date formatters (tr-TR)
```

---

## License

MIT © [furkanerrn](https://github.com/furkanerrn)
