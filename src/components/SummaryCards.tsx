import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/format";

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface CardProps {
  label: string;
  value: number;
  color: string;
  glowColor: string;
  gradient: string;
  icon: React.ReactNode;
  index: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

function SummaryCard({ label, value, color, glowColor, gradient, icon }: CardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background: `linear-gradient(135deg, var(--bg-card) 0%, ${gradient} 100%)`,
        borderRadius: "20px",
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${color}15`,
        position: "relative",
        overflow: "hidden",
        flex: 1,
        padding: "20px",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: glowColor,
          filter: "blur(30px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "12px",
            background: `${color}20`,
            border: `1px solid ${color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>
        <span style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500 }}>
          {label}
        </span>
      </div>

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          color,
          fontSize: "24px",
          fontWeight: 700,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "-0.5px",
        }}
      >
        {formatCurrency(value)}
      </motion.div>
    </motion.div>
  );
}

export default function SummaryCards({ totalIncome, totalExpense, balance }: SummaryCardsProps) {
  return (
    <motion.div
      className="flex gap-4 flex-col sm:flex-row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SummaryCard
        label="Toplam Gelir"
        value={totalIncome}
        color="var(--accent-emerald)"
        glowColor="rgba(52,211,153,0.4)"
        gradient="rgba(52,211,153,0.05)"
        icon={<TrendingUp size={18} />}
        index={0}
      />
      <SummaryCard
        label="Toplam Gider"
        value={totalExpense}
        color="var(--accent-rose)"
        glowColor="rgba(251,113,133,0.4)"
        gradient="rgba(251,113,133,0.05)"
        icon={<TrendingDown size={18} />}
        index={1}
      />
      <SummaryCard
        label="Net Bakiye"
        value={balance}
        color={balance >= 0 ? "var(--accent-violet)" : "var(--accent-rose)"}
        glowColor="rgba(167,139,250,0.4)"
        gradient="rgba(167,139,250,0.05)"
        icon={<Wallet size={18} />}
        index={2}
      />
    </motion.div>
  );
}
