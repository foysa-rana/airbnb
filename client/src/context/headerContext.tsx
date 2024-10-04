import { createContext, useContext, useRef, useState } from "react";

// Create a context for the header
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerContext = createContext<any>(null);

export interface Iguests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface Iactive {
  where: boolean;
  checkIn: boolean;
  checkOut: boolean;
  who: boolean;
  miniSearchBar: boolean;
}

interface IinitialState {
  where: boolean;
  checkIn: boolean;
  checkOut: boolean;
  who: boolean;
  miniSearchBar: boolean;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  startDate: Date | null;
  endDate: Date | null;
  location: string;
  isSearch: boolean;
}

const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the initial state for the search bar's active sections
  const [initialState, setInitialState] = useState<IinitialState>({
    where: false,
    checkIn: false,
    checkOut: false,
    who: false,
    miniSearchBar: false,
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
    startDate: null,
    endDate: null,
    location: "",
    isSearch: false,
  });

  // Ref to track the search bar container for detecting outside clicks
  const searchRef = useRef<HTMLDivElement | null>(null);

  // This function is used to activate a specific section of the search bar
  const activeElement = (section: keyof typeof initialState) => {
    // First, reset all active states to false
    setInitialState((prev) => ({
      ...prev,
      where: false,
      checkIn: false,
      checkOut: false,
      who: false,
      miniSearchBar: false,
    }));

    // Then, activate the selected section
    setInitialState((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle the state of the selected section
    }));
  };

  //Detects clicks outside the search bar. If a click happens outside, it resets all active states.
  const searchHandler = (e: MouseEvent) => {
    // Check if the click was outside the search bar
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      if (window.scrollY > 200) {
        // If scrolled past 200px, show the mini search bar
        setInitialState((prev) => ({
          ...prev,
          where: false,
          checkIn: false,
          checkOut: false,
          who: false,
          miniSearchBar: true,
        }));
      } else {
        // Otherwise, reset all active states and hide the mini search bar
        setInitialState((prev) => ({
          ...prev,
          where: false,
          checkIn: false,
          checkOut: false,
          who: false,
          miniSearchBar: false,
        }));
      }
    }
  };

  // Handles the mini search bar visibility based on a provided boolean value.
  const miniSearchBarHandler = (activeState: boolean) => {
    // Reset all active sections
    setInitialState((prev) => ({
      ...prev,
      where: false,
      checkIn: false,
      checkOut: false,
      who: false,
      miniSearchBar: false,
    }));

    // Set the mini search bar state
    setInitialState((prev) => ({
      ...prev,
      miniSearchBar: activeState,
    }));
  };

  const setIsSearch = (isSearch: boolean) => {
    setInitialState((prev) => ({
      ...prev,
      isSearch,
      where: false,
      checkIn: false,
      checkOut: false,
      who: false,
    }));
  };

  const setLocation = (location: string) => {
    setInitialState((prev) => ({
      ...prev,
      location,
    }));
  };

  // **New: Set start and end dates**
  const setStartDate = (date: Date) => {
    setInitialState((prev) => ({
      ...prev,
      startDate: date,
      endDate: null, // Reset the end date when selecting a new start date
    }));
  };

  const setEndDate = (date: Date) => {
    setInitialState((prev) => ({
      ...prev,
      endDate: date,
    }));
  };

  // guest section increment
  const handleIncrement = (type: keyof Iguests) => {
    setInitialState((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  // guest section decrement
  const handleDecrement = (type: keyof Iguests) => {
    setInitialState((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };

  return (
    // Provide the context values to all child components
    <headerContext.Provider
      value={{
        ...initialState,
        activeElement,
        searchRef,
        searchHandler,
        miniSearchBarHandler,
        handleIncrement,
        handleDecrement,
        setStartDate,
        setEndDate,
        setLocation,
        setIsSearch,
      }}
    >
      {children}
    </headerContext.Provider>
  );
};

// Custom hook to access header context values
const useHeaderContext = () => {
  return useContext(headerContext);
};

export { useHeaderContext, HeaderProvider };
