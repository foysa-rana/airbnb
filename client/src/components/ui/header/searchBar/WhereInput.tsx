import React from "react";
import RegionSearch from "./RegionSearch";
import { useHeaderContext } from "@/context/headerContext";

interface SearchInputProps {
  where: boolean;

  onClick: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ where, onClick }) => {
  const { location, setLocation } = useHeaderContext();
  return (
    <>
      <div
        className={`group flex flex-col items-start basis-full pl-8 py-3 ${
          where ? "" : "hover:bg-slate-100 hover:rounded-full cursor-pointer"
        } relative ${where ? "bg-white rounded-full shadow-md" : ""}`}
        onClick={onClick}
      >
        <span className="text-sm font-semibold">Where</span>
        <input
          type="text"
          placeholder="Search destinations"
          className="outline-none text-gray-600 text-sm bg-transparent"
          value={location}
          onChange={() => setLocation(location)}
        />
      </div>
      {where && <RegionSearch />}
    </>
  );
};

export default SearchInput;
