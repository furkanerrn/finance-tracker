import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import type { Transaction } from "../types";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../data/dummy";

interface EditModalProps {
  transaction: Transaction;
  onSave: (updated: Transaction) => void;
  onClose: () => void;
}

export default function EditModal({ transaction, onSave, onClose }: EditModalProps) {
  const [type, setType] = useState<"income" | "expense">(transaction.type);
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [error, setError] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    const cats = newType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!cats.includes(category)) setCategory(cats[0]);
  };

  const handleSave = () => {
    if (!description.trim()) { setError("Açıklama gerekli."); return; }
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Geçerli bir tutar girin."); return;
    }
    onSave({ ...transaction, type, description: description.trim(), amount: parsedAmount, category, date });
  };

  const accentColor = type === "income" ? "var(--accent-emerald)" : "var(--accent-rose)";
  const accentRgb = type === "income" ? "52,211,153" : "251,113,133";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "24px",
          padding: "24px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h3 style={{
            color: "var(--text-primary)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            margin: 0, fontSize: "16px", fontWeight: 700,
          }}>
            İşlemi Düzenle
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "10px",
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-secondary)",
            }}
          >
            <X size={16} />
          </motion.button>
        </div>

        {/* Type Toggle */}
        <div style={{
          backgroundColor: "var(--bg-input)", borderRadius: "12px",
          padding: "4px", display: "flex", gap: "4px",
          border: "1px solid var(--border-subtle)", marginBottom: "16px",
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
                {t === "income" ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                {t === "income" ? "Gelir" : "Gider"}
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
              className="block mb-1.5">AÇIKLAMA</label>
            <input
              type="text"
              className="input-base"
              placeholder="İşlem açıklaması..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Amount + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
                className="block mb-1.5">TUTAR</label>
              <div className="relative">
                <span style={{
                  position: "absolute", left: "12px", top: "50%",
                  transform: "translateY(-50%)",
                  color: accentColor, fontSize: "14px", fontWeight: 600, pointerEvents: "none",
                }}>₺</span>
                <input
                  type="number"
                  className="input-base"
                  style={{ paddingLeft: "28px" }}
                  placeholder="0,00"
                  value={amount}
                  min="0"
                  step="0.01"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
                className="block mb-1.5">KATEGORİ</label>
              <select className="input-base" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.3px" }}
              className="block mb-1.5">TARİH</label>
            <input
              type="date"
              className="input-base"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ colorScheme: "dark" }}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{ color: "var(--accent-rose)", fontSize: "13px", margin: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "11px", borderRadius: "12px",
                border: "1px solid var(--border-subtle)",
                background: "transparent", color: "var(--text-secondary)",
                cursor: "pointer", fontSize: "14px", fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              İptal
            </button>
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 2, padding: "11px", borderRadius: "12px",
                border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, rgba(${accentRgb},0.9) 0%, rgba(${accentRgb},0.7) 100%)`,
                color: "#0F0F14", fontSize: "14px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                boxShadow: `0 4px 20px rgba(${accentRgb},0.35)`,
              }}
            >
              <Save size={14} />
              Kaydet
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
