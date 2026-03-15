import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import type { Transaction } from "../types";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../data/dummy";
import { todayISO } from "../utils/format";

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    setCategory(newType === "income" ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) { setError("Lütfen bir açıklama girin."); return; }
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Lütfen geçerli bir tutar girin."); return;
    }
    setError("");
    onAdd({
      id: Date.now().toString(), type,
      description: description.trim(),
      amount: parsedAmount, category, date,
    });
    setDescription(""); setAmount(""); setDate(todayISO());
  };

  const accentColor = type === "income" ? "var(--accent-emerald)" : "var(--accent-rose)";
  const accentRgb = type === "income" ? "52,211,153" : "251,113,133";

  return (
    <motion.div
      className="card-no-hover p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "10px",
          background: `rgba(${accentRgb},0.15)`,
          border: `1px solid rgba(${accentRgb},0.3)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s ease",
        }}>
          <PlusCircle size={16} style={{ color: accentColor }} />
        </div>
        <h3 style={{
          color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', sans-serif",
          margin: 0, fontSize: "15px", fontWeight: 700,
        }}>
          Yeni İşlem Ekle
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Type toggle */}
        <div style={{
          backgroundColor: "var(--bg-input)", borderRadius: "12px",
          padding: "4px", display: "flex", gap: "4px",
          border: "1px solid var(--border-subtle)",
        }}>
          {(["income", "expense"] as const).map((t) => {
            const isActive = type === t;
            const color = t === "income" ? "var(--accent-emerald)" : "var(--accent-rose)";
            const rgb = t === "income" ? "52,211,153" : "251,113,133";
            return (
              <motion.button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: "9px",
                  border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: "13px",
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  background: isActive ? `rgba(${rgb},0.18)` : "transparent",
                  color: isActive ? color : "var(--text-muted)",
                  boxShadow: isActive ? `0 0 0 1px rgba(${rgb},0.3)` : "none",
                }}
              >
                {t === "income"
                  ? <ArrowUpCircle size={14} />
                  : <ArrowDownCircle size={14} />}
                {t === "income" ? "Gelir" : "Gider"}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <div>
          <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
            className="block mb-1.5">
            AÇIKLAMA
          </label>
          <input
            type="text" className="input-base"
            placeholder="İşlem açıklaması..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Amount + Category row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
              className="block mb-1.5">
              TUTAR
            </label>
            <div className="relative">
              <span style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)",
                color: accentColor, fontSize: "14px", fontWeight: 600, pointerEvents: "none",
              }}>₺</span>
              <input
                type="number" className="input-base"
                style={{ paddingLeft: "28px" }}
                placeholder="0,00"
                value={amount} min="0" step="0.01"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
              className="block mb-1.5">
              KATEGORİ
            </label>
            <select className="input-base" value={category}
              onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div>
          <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
            className="block mb-1.5">
            TARİH
          </label>
          <input type="date" className="input-base"
            value={date} onChange={(e) => setDate(e.target.value)}
            style={{ colorScheme: "dark" }}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{ color: "var(--accent-rose)", fontSize: "13px", margin: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: `linear-gradient(135deg, rgba(${accentRgb},0.9) 0%, rgba(${accentRgb},0.7) 100%)`,
            color: "#0F0F14", borderRadius: "12px", fontWeight: 700,
            border: "none", cursor: "pointer", width: "100%",
            padding: "12px", fontSize: "14px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            boxShadow: `0 4px 20px rgba(${accentRgb},0.35)`,
            transition: "box-shadow 0.2s ease",
          }}
        >
          <PlusCircle size={16} />
          İşlem Ekle
        </motion.button>
      </form>
    </motion.div>
  );
}
