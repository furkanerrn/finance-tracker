import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { BarChart2 } from "lucide-react";
import type { Transaction } from "../types";
import { formatCurrency } from "../utils/format";

interface MonthlyChartProps {
  transactions: Transaction[];
}

function CustomTooltip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "12px",
      padding: "12px 16px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    }}>
      <p style={{ color: "var(--text-secondary)", margin: "0 0 8px", fontSize: "12px", fontWeight: 600 }}>
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{
          color: p.dataKey === "Gelir" ? "var(--accent-emerald)" : "var(--accent-rose)",
          margin: "2px 0", fontSize: "13px", fontWeight: 600,
        }}>
          {p.dataKey}: {formatCurrency(p.value)}
        </p>
      ))}
      {payload.length === 2 && (
        <p style={{
          color: "var(--accent-violet)",
          margin: "6px 0 0",
          fontSize: "12px",
          fontWeight: 600,
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "6px",
        }}>
          Net: {formatCurrency(payload[0].value - payload[1].value)}
        </p>
      )}
    </div>
  );
}

export default function MonthlyChart({ transactions }: MonthlyChartProps) {
  const data = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const key = `${year}-${String(month).padStart(2, "0")}`;
      const label = new Intl.DateTimeFormat("tr-TR", { month: "short", year: "2-digit" }).format(d);

      const income = transactions
        .filter((t) => t.type === "income" && t.date.startsWith(key))
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = transactions
        .filter((t) => t.type === "expense" && t.date.startsWith(key))
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({ label, Gelir: income, Gider: expense });
    }
    return months;
  }, [transactions]);

  return (
    <div className="card-no-hover p-5">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "10px",
          background: "rgba(167,139,250,0.15)",
          border: "1px solid rgba(167,139,250,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <BarChart2 size={16} color="var(--accent-violet)" />
        </div>
        <div>
          <h3 style={{
            color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', sans-serif",
            margin: 0, fontSize: "15px", fontWeight: 700,
          }}>
            Aylık Gelir & Gider
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "11px", margin: 0 }}>
            Son 6 ay karşılaştırması
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)", radius: 6 }} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            formatter={(value) => (
              <span style={{ color: value === "Gelir" ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
                {value}
              </span>
            )}
          />
          <Bar dataKey="Gelir" fill="var(--accent-emerald)" radius={[6, 6, 0, 0]} fillOpacity={0.85} />
          <Bar dataKey="Gider" fill="var(--accent-rose)" radius={[6, 6, 0, 0]} fillOpacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
