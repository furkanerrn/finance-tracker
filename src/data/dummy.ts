import type { Transaction, CategoryColorMap } from "../types";

export const dummyTransactions: Transaction[] = [
  // Gelirler
  { id: "1",  type: "income",  description: "Mart Maaşı",             amount: 12000, category: "Maaş",           date: "2026-03-01" },
  { id: "2",  type: "income",  description: "Freelance Web Projesi",   amount: 4500,  category: "Freelance",      date: "2026-03-05" },
  { id: "3",  type: "income",  description: "Hisse Senedi Kâr Payı",   amount: 2000,  category: "Yatırım Geliri", date: "2026-03-10" },

  // Giderler
  { id: "4",  type: "expense", description: "Kira Ödemesi",            amount: 3500,  category: "Kira / Konut",   date: "2026-03-01" },
  { id: "5",  type: "expense", description: "Elektrik Faturası",       amount: 450,   category: "Faturalar",      date: "2026-03-03" },
  { id: "6",  type: "expense", description: "Haftalık Market",         amount: 780,   category: "Market / Gıda",  date: "2026-03-04" },
  { id: "7",  type: "expense", description: "Akbil Yükleme",           amount: 200,   category: "Ulaşım",         date: "2026-03-06" },
  { id: "8",  type: "expense", description: "Netflix + Spotify",       amount: 150,   category: "Eğlence",        date: "2026-03-07" },
  { id: "9",  type: "expense", description: "Eczane",                  amount: 320,   category: "Sağlık",         date: "2026-03-08" },
  { id: "10", type: "expense", description: "Kışlık Mont",             amount: 650,   category: "Giyim",          date: "2026-03-12" },
];

export const INCOME_CATEGORY_COLORS: CategoryColorMap = {
  "Maaş":           "#34D399",
  "Freelance":      "#38BDF8",
  "Yatırım Geliri": "#A78BFA",
  "Kira Geliri":    "#FBBF24",
  "Diğer":          "#818CF8",
};

export const EXPENSE_CATEGORY_COLORS: CategoryColorMap = {
  "Kira / Konut": "#FB7185",
  "Ulaşım":       "#A78BFA",
  "Market / Gıda":"#38BDF8",
  "Faturalar":    "#FBBF24",
  "Eğlence":      "#34D399",
  "Sağlık":       "#F472B6",
  "Giyim":        "#FB923C",
  "Diğer":        "#818CF8",
};

export const INCOME_CATEGORIES = ["Maaş", "Freelance", "Yatırım Geliri", "Kira Geliri", "Diğer"];
export const EXPENSE_CATEGORIES = ["Kira / Konut", "Ulaşım", "Market / Gıda", "Faturalar", "Eğlence", "Sağlık", "Giyim", "Diğer"];
