"use client";
import React, { useEffect } from "react";
import WhereInput from "./WhereInput";
import CheckInCheckOut from "./CheckInCheckOut";
import WhoInput from "./WhoInput";
import { Iactive, useHeaderContext } from "@/context/headerContext";
import DateRangePicker from "./DateRangePicker";

interface SearchBarProps {
  miniSearchBar: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ miniSearchBar }) => {
  const {
    where,
    checkIn,
    checkOut,
    who,
    activeElement,
    searchHandler,
    startDate,
    endDate,
  } = useHeaderContext();
  // Toggles the active state for the selected section
  const activeHandler = (section: keyof Iactive) => {
    activeElement(section);
  };

  useEffect(() => {
    document.addEventListener("mousedown", searchHandler);
    return () => {
      document.removeEventListener("mousedown", searchHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${
        miniSearchBar ? "hidden" : "flex"
      } items-center gap-x-2 border rounded-full shadow-md max-w-[53.125rem] mx-auto relative ${
        where || checkIn || checkOut || who ? "bg-gray-200" : ""
      }`}
    >
      {/* Where Input */}
      <WhereInput where={where} onClick={() => activeHandler("where")} />

      {/* Check In and Check Out */}
      <div className="flex gap-x-2">
        <CheckInCheckOut
          startDate={startDate}
          active={checkIn}
          title="Check in"
          onClick={() => activeHandler("checkIn")}
        />
        <CheckInCheckOut
          endDate={endDate}
          active={checkOut}
          title="Check out"
          onClick={() => activeHandler("checkOut")}
        />
        <div className="absolute top-20 w-full left-0">
          {(checkIn || checkOut) && <DateRangePicker />}
        </div>
      </div>

      {/* Who Input */}
      <WhoInput active={who} onClick={() => activeHandler("who")} />
    </div>
  );
};

export default SearchBar;
