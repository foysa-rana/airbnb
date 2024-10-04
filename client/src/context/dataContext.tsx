/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  placesAction,
  searchAction,
  searchToggleRentAction,
  toggleRentAction,
} from "@/actions/placesAction";
import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";
import { useHeaderContext } from "./headerContext";

const dataContext = createContext<any>(null);

export interface Idata {
  _id: string;
  title: string;
  city: string;
  country: string;
  checkIn: Date;
  checkOut: Date;
  rent?: number;
  totalRent?: number;
  image: string;
  hostRef: {
    _id: string;
    Name: string;
    img: string;
  };
  rating: number;
}

interface IinitialState {
  data: Idata[];
  page: number;
  totalPages: number;
  isFetching: boolean;
  limit: number;
  isToggled: boolean;
  isError: boolean;
  errorMessage: string;
}

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialState, setInitialState] = useState<IinitialState>({
    data: [],
    page: 1,
    totalPages: 1,
    isFetching: false,
    limit: 15,
    isToggled: false,
    isError: false,
    errorMessage: "",
  });

  const pathName = usePathname();
  const { location, startDate, endDate } = useHeaderContext();

  // clearing error
  const clearError = () => {
    let timeOutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        setInitialState((prev) => ({
          ...prev,
          isError: false,
          errorMessage: "",
        }));
      }, 3000);
    };
  };

  const optimizedClearError = useMemo(() => clearError(), []);

  // Function to handle toggle
  const rentToggle = async (newToggle: boolean) => {
    try {
      // Use the new toggled state directly for the API call
      const fetchedData = await toggleRentAction({
        limit: initialState.limit,
        page: initialState.page,
        pathName,
        totalBeforTaxes: newToggle, // Pass the new toggled state
      });

      // checking if there is any error
      if (fetchedData.message) {
        setInitialState((prev) => ({
          ...prev,
          isError: true,
          errorMessage: fetchedData.message,
          isToggled: newToggle,
        }));
      } else {
        // Update the state with the fetched data
        setInitialState((prevState) => ({
          ...prevState,
          data: [...(fetchedData.places || [])],
          isToggled: newToggle, // Update the data with fetched places
        }));
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
    optimizedClearError();
  };

  //  fetching data
  const fetchData = async (
    newPage: number,
    toggled: boolean,
    scroll: boolean
  ) => {
    setInitialState((prevState) => ({
      ...prevState,
      isFetching: true, // Trigger skeleton for new data
    }));

    try {
      const fetchedData = await placesAction({
        limit: initialState.limit,
        page: newPage,
        totalBeforTaxes: toggled,
        pathName,
      });

      // checking if there is any error
      if (fetchedData.message) {
        setInitialState((prev) => ({
          ...prev,
          isError: true,
          errorMessage: fetchedData.message,
        }));
      } else {
        if (scroll) {
          setInitialState((prevState) => ({
            ...prevState,
            data: [...prevState.data, ...(fetchedData.places || [])], // Append new data to existing data
            page: fetchedData.currentPage, // Update the current page
            totalPages: fetchedData.totalPages, // Update the total pages
          }));
        } else {
          setInitialState((prevState) => ({
            ...prevState,
            data: [...(fetchedData.places || [])], // Append new data to existing data
            page: fetchedData.currentPage, // Update the current page
            totalPages: fetchedData.totalPages, // Update the total pages
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setInitialState((prevState) => ({
        ...prevState,
        isFetching: false, // Stop showing skeleton after fetching
      }));
    }
    optimizedClearError();
  };

  // Function to handle toggle
  const searchRentToggle = async (newToggle: boolean) => {
    try {
      // Use the new toggled state directly for the API call
      const fetchedData = await searchToggleRentAction({
        limit: initialState.limit,
        page: initialState.page,
        pathName,
        location,
        startDate,
        endDate,
        totalBeforTaxes: newToggle, // Pass the new toggled state
      });

      // checking if there is any error
      if (fetchedData.message) {
        setInitialState((prev) => ({
          ...prev,
          isError: true,
          errorMessage: fetchedData.message,
          isToggled: newToggle,
        }));
      } else {
        // Update the state with the fetched data
        setInitialState((prevState) => ({
          ...prevState,
          data: [...(fetchedData.places || [])],
          isToggled: newToggle, // Update the data with fetched places
        }));
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
    optimizedClearError();
  };

  //  search data
  const searchData = async (
    newPage: number,
    toggled: boolean,
    scroll: boolean
  ) => {
    setInitialState((prevState) => ({
      ...prevState,
      isFetching: true, // Trigger skeleton for new data
    }));

    try {
      const fetchedData = await searchAction({
        limit: initialState.limit,
        page: newPage,
        totalBeforTaxes: toggled,
        pathName,
        location,
        startDate,
        endDate,
      });

      // checking if there is any error
      if (fetchedData.message) {
        setInitialState((prev) => ({
          ...prev,
          isError: true,
          errorMessage: fetchedData.message,
        }));
      } else {
        if (scroll) {
          setInitialState((prevState) => ({
            ...prevState,
            data: [...prevState.data, ...(fetchedData.places || [])], // Append new data to existing data
            page: fetchedData.currentPage, // Update the current page
            totalPages: fetchedData.totalPages, // Update the total pages
          }));
        } else {
          setInitialState((prevState) => ({
            ...prevState,
            data: [...(fetchedData.places || [])], // Append new data to existing data
            page: fetchedData.currentPage, // Update the current page
            totalPages: fetchedData.totalPages, // Update the total pages
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setInitialState((prevState) => ({
        ...prevState,
        isFetching: false, // Stop showing skeleton after fetching
      }));
    }
    optimizedClearError();
  };

  return (
    <dataContext.Provider
      value={{
        ...initialState,
        fetchData,
        rentToggle,
        searchData,
        searchRentToggle,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useDataContext = () => {
  return useContext(dataContext);
};

export { useDataContext, DataProvider };
