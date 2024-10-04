import { useHeaderContext } from "@/context/headerContext";
import RegionCard from "./RegionCard";

const regions = [
  { name: "I'm flexible", imageUrl: "/region/flexible.png" },
  { name: "Southeast Asia", imageUrl: "/region/southeast-asia.png" },
  { name: "Canada", imageUrl: "/region/canada.png" },
  { name: "Europe", imageUrl: "/region/europe.png" },
  { name: "Malaysia", imageUrl: "/region/malaysia.png" },
  { name: "United States", imageUrl: "/region/united-states.png" },
];

const RegionSearch = () => {
  const { setLocation } = useHeaderContext();
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl absolute top-20">
      {/* Header */}
      <h2 className="font-semibold mb-4 text-sm">Search by region</h2>

      {/* Regions Grid */}
      <div className="grid grid-cols-3 gap-4">
        {regions.map((region) => (
          <RegionCard
            key={region.name}
            name={region.name}
            imageUrl={region.imageUrl}
            setLocation={setLocation}
          />
        ))}
      </div>
    </div>
  );
};

export default RegionSearch;
