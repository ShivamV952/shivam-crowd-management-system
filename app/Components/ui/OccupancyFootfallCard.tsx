import StatCard from "./StatCard";

export default function OccupancyFootfallCard() {
  return (
    <div className="flex w-full rounded-xl bg-white divide-x divide-gray-200">
      <div className="flex-1">
        <StatCard
          title="Live Occupancy"
          value="734"
          trend="up"
          trendText="10% More than yesterday"
        />
      </div>

      <div className="flex-1">
        <StatCard
          title="Today’s Footfall"
          value="2,436"
          trend="down"
          trendText="10% Less than yesterday"
        />
      </div>
    </div>
  );
}
