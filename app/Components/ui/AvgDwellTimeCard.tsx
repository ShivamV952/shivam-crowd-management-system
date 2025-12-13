import StatCard from "./StatCard";

export default function AvgDwellTimeCard() {
  return (
    <div className="w-[320px]">
      <StatCard
        title="Avg Dwell Time"
        value="08min 30sec"
        trend="up"
        trendText="6% More than yesterday"
      />
    </div>
  );
}
