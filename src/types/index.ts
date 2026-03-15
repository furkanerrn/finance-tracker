export interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  date: string; // ISO format: "YYYY-MM-DD"
}

export type CategoryColorMap = Record<string, string>;
