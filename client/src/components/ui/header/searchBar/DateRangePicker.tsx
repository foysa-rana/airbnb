import { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  getDaysInMonth,
  isBefore,
  isSameDay,
} from "date-fns";
import { useHeaderContext } from "@/context/headerContext";

const DateRangePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(addMonths(new Date(), 1));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const { startDate, endDate, setStartDate, setEndDate } = useHeaderContext();

  const today = new Date(); // Get today's date

  // Move to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setNextMonth(subMonths(nextMonth, 1));
  };

  // Move to the next month
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setNextMonth(addMonths(nextMonth, 1));
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (isBefore(date, today)) return; // Prevent selection of past dates

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isBefore(date, startDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  // Check if the date is in range
  const isInRange = (date: Date) => {
    if (!startDate || !hoverDate || endDate) return false;
    return isBefore(startDate, date) && isBefore(date, hoverDate);
  };

  // Render days of the week
  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 gap-2 text-center text-gray-500">
      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
        <span key={day}>{day}</span>
      ))}
    </div>
  );

  // Render the days of the month for a given month
  const renderDaysInMonth = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();

    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <span key={`empty-${i}`} />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(date.getFullYear(), date.getMonth(), i + 1);
      const isSelectedStart = startDate && isSameDay(day, startDate);
      const isSelectedEnd = endDate && isSameDay(day, endDate);
      const isBetween = startDate && hoverDate && isInRange(day);
      const isDisabled = isBefore(day, today); // Check if the date is in the past

      return (
        <button
          key={i + 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            isDisabled
              ? "text-gray-300 cursor-not-allowed" // Style for past dates
              : isSelectedStart || isSelectedEnd
              ? "bg-black text-white"
              : isBetween
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
          onClick={() => !isDisabled && handleDateClick(day)}
          onMouseEnter={() => !isDisabled && setHoverDate(day)}
          disabled={isDisabled} // Disable the button for past dates
        >
          {i + 1}
        </button>
      );
    });

    return (
      <div className="grid grid-cols-7 gap-2">
        {emptyDays}
        {days}
      </div>
    );
  };

  return (
    <div className="bg-white px-16 py-5 rounded-lg shadow-lg max-w-[850px]">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <button className="px-4 py-2 font-semibold rounded-full bg-gray-100">
          Dates
        </button>
      </div>

      {/* Calendar */}
      <div className="flex justify-between gap-x-10 items-center mb-4">
        <div className="flex flex-col gap-y-2 items-center">
          <div className="flex w-full mb-5">
            <button
              onClick={handlePrevMonth}
              className="text-gray-500 hover:text-black star"
            >
              &#10094;
            </button>
            <p className="font-semibold ml-[30%]">
              {format(currentMonth, "MMMM yyyy")}
            </p>
          </div>
          <div className="w-full">{renderDaysOfWeek()}</div>
          {renderDaysInMonth(currentMonth)}
        </div>
        <div className="flex flex-col gap-y-2 items-center">
          <div className="flex w-full mb-5">
            <p className="font-semibold ml-[30%]">
              {format(nextMonth, "MMMM yyyy")}
            </p>
            <button
              onClick={handleNextMonth}
              className="text-gray-500 hover:text-black ml-auto"
            >
              &#10095;
            </button>
          </div>

          <div className="w-full">{renderDaysOfWeek()}</div>
          {renderDaysInMonth(nextMonth)}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
