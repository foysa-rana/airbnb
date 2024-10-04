"use client";
import React, { useEffect } from "react";
import moment from "moment";
import CardSkeleton from "@/components/ui/skeleton/CardSkeleton";
import { Idata, useDataContext } from "@/context/dataContext";
import ErrorModal from "@/components/ui/ErrorModal";
import { useHeaderContext } from "@/context/headerContext";

// Lazy load Card component
const Card = React.lazy(() => import("@/components/ui/Card"));

const CardContainer = () => {
  const {
    page,
    data,
    fetchData,
    isFetching,
    totalPages,
    isToggled,
    isError,
    errorMessage,
    searchData,
  } = useDataContext();

  const { isSearch } = useHeaderContext();

  useEffect(() => {
    if (isSearch) {
      searchData(page, isToggled);
    } else {
      fetchData(page, isToggled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToggled, isSearch]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (page < totalPages && !isFetching) {
        const scroll = true;
        if (isSearch) {
          searchData(page + 1, isToggled, scroll);
        } else {
          fetchData(page + 1, isToggled, scroll);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages, isFetching]);

  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
      {isError && <ErrorModal errorMessage={errorMessage} />}
      {/* Render the existing data */}
      {data?.map((ele: Idata, index: number) => (
        <Card
          key={index}
          title={ele.title}
          location={`${ele.city}, ${ele.country}`}
          hostName={ele.hostRef.Name}
          img={`/places/${ele.image}`}
          hostImage={`/profile/${ele.hostRef.img}`}
          rating={ele.rating}
          rent={ele.rent}
          totalRent={ele.totalRent}
          stayDates={`${moment(ele.checkIn).format("MMM D")} - ${moment(
            ele.checkOut
          ).format("MMM D")}`}
        />
      ))}

      {/* Show the skeleton only for the new data being fetched */}
      {isFetching &&
        Array(15)
          .fill(0)
          .map((_, index) => <CardSkeleton key={index} />)}
    </div>
  );
};

export default CardContainer;
