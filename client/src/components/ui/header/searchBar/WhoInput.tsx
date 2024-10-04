import React from "react";
import { FaSearch } from "react-icons/fa";
import AddGuest from "./AddGuest";
import { useHeaderContext } from "@/context/headerContext";
import { useDataContext } from "@/context/dataContext";

interface WhoInputProps {
  active: boolean;
  onClick: () => void;
}

const WhoInput: React.FC<WhoInputProps> = ({ active, onClick }) => {
  const { setIsSearch } = useHeaderContext();
  const { isToggled, searchData } = useDataContext();
  return (
    <>
      <div
        className={`flex justify-between items-center basis-full py-3 ${
          active ? "" : "hover:bg-slate-100 hover:rounded-full cursor-pointer"
        } relative ${
          active ? "bg-white rounded-full shadow-md" : ""
        }cursor-pointer relative after:absolute after:top-1/2 after:translate-y-[-50%] after:left-[-5px] after:h-12 after:border-e-[1px] after:border-gray-300`}
        onClick={onClick}
      >
        <div className="flex flex-col items-start px-4">
          <h4 className="text-sm font-semibold">Who</h4>
          <p className="text-gray-600 text-sm whitespace-nowrap">Add guests</p>
        </div>
        {/* Search Icon */}
        <button
          className="ml-4 p-2 bg-radical-red rounded-full text-white flex items-center gap-x-2 mr-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevents parent `div` click from being triggered
            setIsSearch(true);
            searchData(1, isToggled);
          }}
        >
          <FaSearch />{" "}
          <span className={`font-semibold text-sm ${active ? "" : "hidden"}`}>
            Search
          </span>
        </button>
      </div>
      {active && <AddGuest />}
    </>
  );
};

export default WhoInput;
