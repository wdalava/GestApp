import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#f87171",
  "#facc15",
  "#10b981",
  "#6366f1",
  "#e879f9",
  "#60a5fa",
  "#f15890",
];

export default function PieChartExpenses({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold mb-4">
        Répartition des Dépenses
      </h3>
      <ResponsiveContainer width="100%" height={250} className="min-h-[200px]">
        <PieChart>
          <Pie
            dataKey="value"
            nameKey="categorie"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}$`, name]}
            contentStyle={{
              fontSize: "14px",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
