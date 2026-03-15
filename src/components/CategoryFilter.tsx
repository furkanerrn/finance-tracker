import { EXPENSE_CATEGORY_COLORS, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../data/dummy";

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const ALL_CATEGORIES = ["Tümü", ...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div
      style={{ overflowX: "auto", paddingBottom: "4px" }}
      className="flex gap-2"
    >
      {ALL_CATEGORIES.map((cat) => {
        const isSelected = selected === cat;
        const color = EXPENSE_CATEGORY_COLORS[cat] ?? "var(--accent-violet)";
        const isAll = cat === "Tümü";

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              whiteSpace: "nowrap",
              padding: "6px 14px",
              borderRadius: "20px",
              border: `1px solid ${isSelected ? (isAll ? "var(--accent-violet)" : color) : "var(--border-subtle)"}`,
              backgroundColor: isSelected
                ? isAll
                  ? "rgba(167,139,250,0.15)"
                  : `${color}22`
                : "transparent",
              color: isSelected
                ? isAll
                  ? "var(--accent-violet)"
                  : color
                : "var(--text-secondary)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
