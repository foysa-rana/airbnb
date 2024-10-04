"use server";

export interface Iquery {
  limit: number;
  page: number;
  totalBeforTaxes?: boolean;
  pathName: string;
}

export interface Isearch extends Iquery {
  location: string;
  startDate: Date;
  endDate: Date;
}

// fetching places
export const placesAction = async ({
  limit,
  page,
  totalBeforTaxes,
  pathName,
}: Iquery) => {
  try {
    const response = await fetch(
      `${process.env.HOST}/api/v1/places?limit=${limit}&page=${page}${
        totalBeforTaxes ? "&rent=totalRentBeforeTaxes" : ""
      }${pathName !== "/" ? "&tag=" + pathName : ""}`,
      {
        next: { revalidate: 600 },
      }
    );
    const responseData = await response.json();
    if (response.status !== 200) {
      return responseData;
    }
    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};

// total rent before taxes
export const toggleRentAction = async ({
  limit,
  page,
  totalBeforTaxes,
  pathName,
}: Iquery) => {
  try {
    const response = await fetch(
      `${process.env.HOST}/api/v1/places/rent?limit=${limit}&page=${page}${
        totalBeforTaxes ? "&rent=totalRentBeforeTaxes" : ""
      }${pathName !== "/" ? "&tag=" + pathName : ""}`,
      {
        next: { revalidate: 600 },
      }
    );
    const responseData = await response.json();
    if (response.status !== 200) {
      return responseData;
    }
    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};

// search fetching
export const searchAction = async ({
  limit,
  page,
  totalBeforTaxes,
  pathName,
  location,
  startDate,
  endDate,
}: Isearch) => {
  try {
    const response = await fetch(
      `${process.env.HOST}/api/v1/places?limit=${limit}&page=${page}${
        totalBeforTaxes ? "&rent=totalRentBeforeTaxes" : ""
      }${pathName !== "/" ? "&tag=" + pathName : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, startDate, endDate }),
      }
    );
    const responseData = await response.json();
    if (response.status !== 200) {
      return responseData;
    }
    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};

// search fetching total rent before taxes
export const searchToggleRentAction = async ({
  limit,
  page,
  totalBeforTaxes,
  pathName,
  location,
  startDate,
  endDate,
}: Isearch) => {
  try {
    const response = await fetch(
      `${process.env.HOST}/api/v1/places/rent?limit=${limit}&page=${page}${
        totalBeforTaxes ? "&rent=totalRentBeforeTaxes" : ""
      }${pathName !== "/" ? "&tag=" + pathName : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, startDate, endDate }),
      }
    );
    const responseData = await response.json();
    if (response.status !== 200) {
      return responseData;
    }
    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
  }
};
