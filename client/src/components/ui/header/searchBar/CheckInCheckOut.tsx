import { format } from "date-fns";

interface CheckInCheckOutProps {
  startDate?: Date;
  endDate?: Date;
  active: boolean;
  title: string;
  onClick: () => void;
}

const CheckInCheckOut: React.FC<CheckInCheckOutProps> = ({
  startDate,
  endDate,
  active,
  title,
  onClick,
}) => {
  return (
    <div
      className={`px-4 w-32 py-3 ${
        active ? "" : "hover:bg-slate-100 hover:rounded-full cursor-pointer"
      } relative ${
        active ? "bg-white rounded-full shadow-md" : ""
      } cursor-pointer relative after:absolute after:top-1/2 after:translate-y-[-50%] after:left-[-5px] after:h-12 after:border-e-[1px] after:border-gray-300`}
      onClick={onClick}
    >
      <div className="flex flex-col items-start">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-gray-600 text-sm">
          {startDate && endDate
            ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
            : startDate
            ? format(startDate, "MMM d")
            : endDate
            ? format(endDate, "MMM d")
            : "Add dates"}
        </p>
      </div>
    </div>
  );
};

export default CheckInCheckOut;
