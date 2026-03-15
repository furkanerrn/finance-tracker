import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { EXPENSE_CATEGORY_COLORS, INCOME_CATEGORY_COLORS } from "../data/dummy";
import { formatCurrency } from "../utils/format";

interface PieDataItem {
  name: string;
  value: number;
}

interface PieChartPanelProps {
  expensePieData: PieDataItem[];
  incomePieData: PieDataItem[];
  totalExpense: number;
  totalIncome: number;
}

function CenterLabel({ cx, cy, total, isIncome }: { cx: number; cy: number; total: number; isIncome: boolean }) {
  const color = isIncome ? "var(--accent-emerald)" : "var(--accent-rose)";
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="var(--text-secondary)" fontSize={11}>
        {isIncome ? "Toplam Gelir" : "Toplam Gider"}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill={color} fontSize={15} fontWeight={700}>
        {formatCurrency(total)}
      </text>
    </g>
  );
}

function CustomTooltip({ active, payload, isIncome }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  isIncome: boolean;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const color = isIncome ? "var(--accent-emerald)" : "var(--accent-rose)";
  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "10px",
      padding: "10px 14px",
      fontSize: "13px",
    }}>
      <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: "0 0 4px" }}>{item.name}</p>
      <p style={{ color, margin: 0 }}>{formatCurrency(item.value)}</p>
    </div>
  );
}

function CustomLegend({ payload, pieData, total, isIncome }: {
  payload?: Array<{ value: string; color: string }>;
  pieData: PieDataItem[];
  total: number;
  isIncome: boolean;
}) {
  if (!payload) return null;
  const textColor = isIncome ? "var(--accent-emerald)" : "var(--accent-rose)";
  return (
    <div className="flex flex-col gap-2 mt-2">
      {payload.map((entry) => {
        const item = pieData.find((d) => d.name === entry.value);
        const pct = total > 0 && item ? ((item.value / total) * 100).toFixed(1) : "0";
        return (
          <div key={entry.value} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: entry.color, flexShrink: 0 }} />
              <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{entry.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--text-primary)", fontSize: "12px", fontWeight: 500 }}>
                {item ? formatCurrency(item.value) : ""}
              </span>
              <span style={{ color: textColor, fontSize: "11px", fontWeight: 600 }}>%{pct}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PieChartPanel({
  expensePieData, incomePieData, totalExpense, totalIncome
}: PieChartPanelProps) {
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");

  const isIncome = activeTab === "income";
  const pieData = isIncome ? incomePieData : expensePieData;
  const total = isIncome ? totalIncome : totalExpense;
  const colorMap = isIncome ? INCOME_CATEGORY_COLORS : EXPENSE_CATEGORY_COLORS;
  const colors = pieData.map((item) => colorMap[item.name] ?? "#818CF8");
  const accentColor = isIncome ? "var(--accent-emerald)" : "var(--accent-rose)";
  const accentRgb = isIncome ? "52,211,153" : "251,113,133";

  return (
    <div className="card-no-hover p-5">
      {/* Header + Toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h3 style={{
          color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', sans-serif",
          margin: 0, fontSize: "15px", fontWeight: 700,
        }}>
          {isIncome ? "Gelir Dağılımı Analizi" : "Gider Dağılımı Analizi"}
        </h3>

        {/* Tab Toggle */}
        <div style={{
          display: "flex", gap: "4px",
          background: "var(--bg-input)", borderRadius: "10px",
          padding: "3px", border: "1px solid var(--border-subtle)",
        }}>
          {(["expense", "income"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const rgb = tab === "income" ? "52,211,153" : "251,113,133";
            const tabColor = tab === "income" ? "var(--accent-emerald)" : "var(--accent-rose)";
            return (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "5px 12px", borderRadius: "7px", border: "none",
                  cursor: "pointer", fontSize: "12px", fontWeight: 600,
                  transition: "all 0.2s ease",
                  background: isActive ? `rgba(${rgb},0.15)` : "transparent",
                  color: isActive ? tabColor : "var(--text-muted)",
                  boxShadow: isActive ? `0 0 0 1px rgba(${rgb},0.3)` : "none",
                }}
              >
                {tab === "income"
                  ? <TrendingUp size={12} />
                  : <TrendingDown size={12} />}
                {tab === "income" ? "Gelir" : "Gider"}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {pieData.length === 0 ? (
            <div style={{
              minHeight: "220px", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "8px",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "14px",
                background: `rgba(${accentRgb},0.1)`,
                border: `1px solid rgba(${accentRgb},0.2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {isIncome
                  ? <TrendingUp size={20} color={accentColor} />
                  : <TrendingDown size={20} color={accentColor} />}
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: 0 }}>
                {isIncome ? "Gelir" : "Gider"} verisi bulunamadı.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={700}
                  labelLine={false}
                  label={(props) => (
                    <CenterLabel cx={props.cx} cy={props.cy} total={total} isIncome={isIncome} />
                  )}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isIncome={isIncome} />} />
                <Legend
                  content={(props) => (
                    <CustomLegend
                      payload={props.payload as Array<{ value: string; color: string }>}
                      pieData={pieData}
                      total={total}
                      isIncome={isIncome}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
