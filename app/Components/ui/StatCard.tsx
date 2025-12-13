interface StatCardProps {
  title: string;
  value: string;
  trendText: string;
  trend: "up" | "down";
}

export default function StatCard({
  title,
  value,
  trendText,
  trend,
}: StatCardProps) {
  const isUp = trend === "up";

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
      <p className="text-sm font-medium text-gray-700">{title}</p>

      <p className="text-3xl font-semibold text-gray-900">{value}</p>

      <div className="flex items-center gap-2 text-sm">
        <span className={isUp ? "text-green-500" : "text-red-500"}>
          {isUp ? "↗" : "↘"}
        </span>
        <span className="text-gray-600">{trendText}</span>
      </div>
    </div>
  );
}
