import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function IncomsVsExpenses({ data }) {
  return (
    <div className="graphic-container">
      <h3 className="graphic-container-title">
        Revenus vs Dépenses (par jour)
      </h3>
      <ResponsiveContainer width="100%" height={250} className="min-h-[200px]">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis fontSize={12} />
          <Tooltip
            contentStyle={{
              fontSize: "14px",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="incomes" fill="#4ade80" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
