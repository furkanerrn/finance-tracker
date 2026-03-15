import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../types";
import { EXPENSE_CATEGORY_COLORS } from "../data/dummy";
import { formatCurrency, formatDate } from "../utils/format";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  Maaş: "💼", Freelance: "💻", Yatırım: "📈", Kira: "🏠",
  Market: "🛒", Yemek: "🍔", Ulaşım: "🚗", Eğlence: "🎮",
  Sağlık: "💊", Giyim: "👔", Faturalar: "📄", Diğer: "📦",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
  exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
};

export default function TransactionList({ transactions, onDelete, onEdit }: TransactionListProps) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-no-hover p-10 flex flex-col items-center justify-center gap-4"
      >
        <div style={{
          width: 64, height: 64, borderRadius: "20px",
          background: "var(--bg-input)",
          border: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Inbox size={28} color="var(--text-muted)" />
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500, margin: 0 }}>
            Henüz işlem eklenmedi
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: 4 }}>
            Yeni bir işlem ekleyerek başla
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="card-no-hover p-5">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h3 style={{ color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0 }}
          className="text-base font-bold">
          İşlemler
        </h3>
        <span style={{
          fontSize: "12px", color: "var(--text-muted)",
          background: "var(--bg-input)", padding: "3px 10px",
          borderRadius: "20px", border: "1px solid var(--border-subtle)",
        }}>
          {sorted.length} kayıt
        </span>
      </div>

      <motion.div
        className="flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {sorted.map((t) => {
            const isIncome = t.type === "income";
            const color = isIncome
              ? "var(--accent-emerald)"
              : (EXPENSE_CATEGORY_COLORS[t.category] ?? "#818CF8");
            const emoji = CATEGORY_ICONS[t.category] ?? "📦";

            return (
              <motion.div
                key={t.id}
                layout
                variants={itemVariants}
                exit="exit"
                whileHover={{ x: 4, backgroundColor: "var(--bg-card-hover)" }}
                style={{
                  backgroundColor: "var(--bg-input)",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  border: "1px solid var(--border-subtle)",
                  cursor: "default",
                }}
              >
                {/* Üst satır: emoji + açıklama + tutar */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "11px",
                    backgroundColor: `${color}18`,
                    border: `1.5px solid ${color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: "17px",
                  }}>
                    {emoji}
                  </div>

                  <p style={{
                    flex: 1, minWidth: 0,
                    color: "var(--text-primary)", fontWeight: 600, fontSize: "14px",
                    margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {t.description}
                  </p>

                  <motion.span
                    key={t.amount}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      flexShrink: 0,
                      color: isIncome ? "var(--accent-emerald)" : "var(--accent-rose)",
                      fontWeight: 700, fontSize: "15px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {isIncome ? "+" : "-"}{formatCurrency(t.amount)}
                  </motion.span>
                </div>

                {/* Alt satır: kategori + tarih + aksiyonlar */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  marginTop: "8px", paddingLeft: "50px",
                }}>
                  <span style={{
                    color, fontSize: "11px", fontWeight: 600,
                    background: `${color}18`, padding: "2px 8px",
                    borderRadius: "20px", flexShrink: 0,
                  }}>
                    {t.category}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "11px", flexShrink: 0 }}>
                    {formatDate(t.date)}
                  </span>

                  <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(t)}
                      title="Düzenle"
                      style={{
                        width: 28, height: 28, borderRadius: "8px",
                        border: "1px solid var(--border-subtle)",
                        background: "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "var(--text-muted)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Pencil size={12} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(t.id)}
                      title="Sil"
                      style={{
                        width: 28, height: 28, borderRadius: "8px",
                        border: "1px solid rgba(251,113,133,0.2)",
                        background: "rgba(251,113,133,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "var(--accent-rose)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Trash2 size={12} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
