"use client";
import { useHeaderContext } from "@/context/headerContext";
import React from "react";
import { FaSearch } from "react-icons/fa";

const MiniSearchBar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { active, activeElement } = useHeaderContext();
  // Toggles the active state for the selected section
  const activeHandler = (section: keyof typeof active) => {
    activeElement(section);
    console.log("called");
  };
  return (
    <div className="flex items-center gap-x-8 border rounded-full shadow-md mx-auto py-2 px-4 bg-white text-sm cursor-pointer">
      {/* Location */}
      <h4 className="font-semibold" onClick={() => activeHandler("where")}>
        Anywhere
      </h4>

      {/* Date */}
      <h4
        className="font-semibold relative after:absolute after:top-1/2 after:translate-y-[-50%] after:left-[-15px] after:h-8 after:border-e-[1px] after:border-gray-300"
        onClick={() => activeHandler("checkIn")}
      >
        Any week
      </h4>

      {/* Guests */}

      <div
        className="flex gap-x-4 items-center"
        onClick={() => activeHandler("who")}
      >
        <h4 className="text-gray-600 relative after:absolute after:top-1/2 after:translate-y-[-50%] after:left-[-15px] after:h-8 after:border-e-[1px] after:border-gray-300">
          Add guests
        </h4>

        {/* Search Button */}
        <button className="ml-auto p-2 bg-radical-red rounded-full text-white">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default MiniSearchBar;
