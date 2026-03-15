import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { formatCurrency } from "../utils/format";

interface HeaderProps {
  balance: number;
}

export default function Header({ balance }: HeaderProps) {
  const isPositive = balance >= 0;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="ft-header"
    >
      <div className="ft-header-inner">
        {/* Logo */}
        <div className="ft-logo">
          <motion.div
            className="ft-logo-icon"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Wallet size={20} strokeWidth={2.5} />
          </motion.div>
          <div className="ft-logo-text">
            <span className="ft-logo-name">FinansTracker</span>
            <span className="ft-logo-sub">Kişisel Finans Yönetimi</span>
          </div>
        </div>

        {/* Center badge */}
        <motion.div
          className="ft-header-badge"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={13} />
          <span>Mart 2026</span>
        </motion.div>

        {/* Balance chip */}
        <motion.div
          className="ft-balance-chip"
          data-positive={isPositive}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {isPositive ? (
            <TrendingUp size={15} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={15} strokeWidth={2.5} />
          )}
          <div className="ft-balance-text">
            <span className="ft-balance-label">Net Bakiye</span>
            <motion.span
              key={balance}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="ft-balance-value"
            >
              {formatCurrency(balance)}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
