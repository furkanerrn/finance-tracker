import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";
import type { Transaction } from "../types";
import { EXPENSE_CATEGORY_COLORS } from "../data/dummy";
import { formatCurrency, formatDate } from "../utils/format";

interface TransactionListProps {
  transactions: Transaction[];
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
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
  exit: { x: 20, opacity: 0, transition: { duration: 0.2 } },
};

export default function TransactionList({ transactions }: TransactionListProps) {
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
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "default",
                }}
              >
                {/* Emoji icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: "12px",
                  backgroundColor: `${color}18`,
                  border: `1.5px solid ${color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: "18px",
                }}>
                  {emoji}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    color: "var(--text-primary)", fontWeight: 600, fontSize: "14px",
                    margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {t.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <span style={{
                      color, fontSize: "11px", fontWeight: 600,
                      background: `${color}18`, padding: "2px 8px", borderRadius: "20px",
                    }}>
                      {t.category}
                    </span>
                    <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                      {formatDate(t.date)}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <motion.div
                  key={t.amount}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0,
                  }}
                >
                  <span style={{
                    color: isIncome ? "var(--accent-emerald)" : "var(--accent-rose)",
                    fontWeight: 700, fontSize: "15px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {isIncome ? "+" : "-"}{formatCurrency(t.amount)}
                  </span>
                  <span style={{
                    fontSize: "10px", fontWeight: 500,
                    color: isIncome ? "var(--accent-emerald)" : "var(--accent-rose)",
                    opacity: 0.7,
                  }}>
                    {isIncome ? "gelir" : "gider"}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
