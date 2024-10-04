"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaBed,
  FaMountain,
  FaCity,
  FaUmbrellaBeach,
  FaSearch,
} from "react-icons/fa";
import { GiMountainCave, GiPalmTree, GiIsland } from "react-icons/gi";
import { MdOutlineVilla, MdOutlineBreakfastDining } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { BsSnow } from "react-icons/bs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { useDataContext } from "@/context/dataContext";
import { useHeaderContext } from "@/context/headerContext";

const Navbar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState({
    left: true, // Initially set to true because we are at the leftmost position
    right: false, // Initially set to false because we can scroll right
  });

  const { isToggled, rentToggle, searchRentToggle } = useDataContext();
  const { isSearch, setIsSearch } = useHeaderContext();

  const updateScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Update scroll position
      setScrollPosition({
        left: scrollLeft === 0, // No more space to scroll left
        right: scrollLeft + clientWidth >= scrollWidth, // No more space to scroll right
      });
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(updateScrollPosition, 300); // Ensure that the state is updated after the scroll animation
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(updateScrollPosition, 300); // Ensure that the state is updated after the scroll animation
    }
  };

  // useEffect to update the scroll position when the component is mounted
  useEffect(() => {
    updateScrollPosition(); // Set initial scroll position

    const refCurrent = scrollRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("scroll", updateScrollPosition); // Attach scroll event listener
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("scroll", updateScrollPosition); // Clean up event listener
      }
    };
  }, []);

  const handleToggle = () => {
    if (isSearch) {
      searchRentToggle(!isToggled);
    } else {
      rentToggle(!isToggled);
    }
  };

  return (
    <nav className="pt-56">
      <div className="container mx-auto">
        <div className="bg-white flex space-x-6 h-20">
          <div className="w-full overflow-hidden relative">
            {/* Left Button for sliding */}
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 border-[1px] rounded-full p-2 ${
                scrollPosition.left ? "hidden" : ""
              }`}
            >
              <AiOutlineLeft size={16} />
            </button>

            {/* Categories - scrollable container */}
            <div
              ref={scrollRef}
              className={`flex overflow-hidden space-x-10 scrollbar-hide h-20 items-center text-gray-500 font-semibold text-xs ${
                scrollPosition.left ? "" : "ml-12"
              } ${scrollPosition.right ? "" : "mr-12"}`}
            >
              {/* Icons wrapped in button with onClick handlers */}
              {isSearch ? (
                <Link
                  href="/"
                  className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
                >
                  <FaSearch size={24} />
                  <span>Search Result</span>
                </Link>
              ) : (
                <Link
                  href="/"
                  className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
                >
                  <FaCity size={24} />
                  <span>All</span>
                </Link>
              )}

              <Link
                href="/countryside"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <GiPalmTree size={24} />
                <span>Countryside</span>
              </Link>

              <Link
                href="/omg"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <GiMountainCave size={24} />
                <span>OMG!</span>
              </Link>

              <Link
                href="/amazing-views"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <GiIsland size={24} />
                <span>Amazing views</span>
              </Link>

              <Link
                href="/national-parks"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <FaMountain size={24} />
                <span>National parks</span>
              </Link>

              <Link
                href="/luxe"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <MdOutlineVilla size={24} />
                <span>Luxe</span>
              </Link>

              <Link
                href="/rooms"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <FaBed size={24} />
                <span>Rooms</span>
              </Link>

              <Link
                href="/bed-and-breakfasts"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <MdOutlineBreakfastDining size={24} />
                <span>Bed & Breakfasts</span>
              </Link>

              <Link
                href="/top-of-the-world"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <FaUmbrellaBeach size={24} />
                <span>Top of the world</span>
              </Link>

              <Link
                href="/arctic"
                className="flex flex-col items-center whitespace-nowrap gap-y-2 h-14 hover:text-gray-800 relative hover:after:w-full hover:after:border-b-2 after:absolute after:bottom-0 hover:after:border-gray-400"
              >
                <BsSnow size={24} />
                <span>Arctic</span>
              </Link>
            </div>

            {/* Right Button for sliding */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 border-[1px] rounded-full p-2 ${
                scrollPosition.right ? "hidden" : ""
              }`}
            >
              <AiOutlineRight size={16} />
            </button>
          </div>

          {/* Filters & Toggle */}
          <div className="flex items-center space-x-4">
            <button
              className="flex text-sm font-semibold items-center space-x-1 border rounded-lg px-4 py-2 whitespace-nowrap"
              onClick={() => setIsSearch(false)}
            >
              <FiFilter size={24} />
              <span>Clear Search</span>
            </button>

            <div
              className="flex items-center space-x-3 border-[1px] px-4 py-2 rounded-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
            >
              <label className="text-sm text-gray-700 whitespace-nowrap font-semibold cursor-pointer">
                Display total before taxes
              </label>
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  isToggled ? "bg-green-500" : ""
                }`}
              >
                {/* Switch handle */}
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    isToggled ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
