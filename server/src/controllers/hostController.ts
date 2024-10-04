import { Request, Response, NextFunction } from "express";
import { placeModel } from "../model/placeModel.js";
import { hostModel } from "../model/hostModel.js";

interface IqueryObj {
  [key: string]: string | any; // Adjust based on your actual data structure
}

// get all with query places
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 15;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

    // removing forward slash from pathname and replace dash in to space
    const tag: string | null =
      typeof query.tag === "string"
        ? query.tag
            .split("")
            .filter((item: string) => item !== "/")
            .join("")
            .replace(/-/g, " ") // Replace dashes with spaces
        : null;

    let places;
    if (query.rent === "totalRentBeforeTaxes") {
      places = await placeModel.aggregate([
        {
          $match: tag ? { tags: tag } : {},
        },
        {
          $lookup: {
            from: "hosts",
            localField: "hostRef",
            foreignField: "_id",
            as: "hostDetails",
          },
        },
        {
          $unwind: "$hostDetails",
        },
        {
          $addFields: {
            daysDifference: {
              $divide: [
                { $subtract: ["$checkOut", "$checkIn"] },
                1000 * 60 * 60 * 24,
              ],
            },
          },
        },
        {
          $addFields: {
            totalRent: {
              $multiply: ["$daysDifference", "$rent"],
            },
          },
        },
        {
          $set: {
            hostRef: "$hostDetails",
          },
        },
        {
          $unset: ["__v", "tags", "rent", "hostRef.__v"],
        },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            daysDifference: 0,
            updatedPrice: 0,
            hostDetails: 0,
          },
        },
      ]);
    } else {
      // Populate the host details
      places = await placeModel
        .find(tag ? { tags: tag } : {})
        .populate({
          path: "hostRef",
          model: hostModel,
          select: { __v: 0 },
        })
        .select({ __v: 0, tags: 0 })
        .limit(limit)
        .skip(skip);
    }

    // Check if places exist, otherwise return a 404
    if (!places || places.length === 0) {
      next({
        statusCode: 404,
        message: "Data not found",
      });
      return;
    }

    const totalPlaces = await placeModel.countDocuments(
      tag ? { tags: tag } : {}
    );
    const totalPages = Math.ceil(totalPlaces / limit);

    // if (query.rent) {
    //   const
    //   const days = new Date(places.checkIn);
    // }

    // Send the places as JSON response
    return res.status(200).json({ totalPages, currentPage: page, places });
  } catch (error: any) {
    next({
      statusCode: 500,
      message: "An error occurred while fetching the places",
    });
  }
};

// get all with query with total rent
export const totalBeforeTaxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 15;
    const page = Number(query.page) || 1;

    // removing forward slash from pathname and replace dash in to space
    const tag: string | null =
      typeof query.tag === "string"
        ? query.tag
            .split("")
            .filter((item: string) => item !== "/")
            .join("")
            .replace(/-/g, " ") // Replace dashes with spaces
        : null;

    let places;
    if (query.rent === "totalRentBeforeTaxes") {
      places = await placeModel.aggregate([
        { $match: tag ? { tags: tag } : {} },
        {
          $lookup: {
            from: "hosts",
            localField: "hostRef",
            foreignField: "_id",
            as: "hostDetails",
          },
        },
        {
          $unwind: "$hostDetails",
        },
        {
          $addFields: {
            daysDifference: {
              $divide: [
                { $subtract: ["$checkOut", "$checkIn"] },
                1000 * 60 * 60 * 24,
              ],
            },
          },
        },
        {
          $addFields: {
            totalRent: {
              $multiply: ["$daysDifference", "$rent"],
            },
          },
        },
        {
          $set: {
            hostRef: "$hostDetails",
          },
        },
        {
          $unset: ["__v", "tags", "rent", "hostRef.__v"],
        },
        {
          $limit: limit,
        },
        {
          $project: {
            daysDifference: 0,
            updatedPrice: 0,
            hostDetails: 0,
          },
        },
      ]);
    } else {
      // / Populate the host details
      places = await placeModel
        .find(tag ? { tags: tag } : {})
        .populate({
          path: "hostRef",
          model: hostModel,
          select: { __v: 0 },
        })
        .select({ __v: 0, tags: 0 })
        .limit(limit);
    }

    // Check if places exist, otherwise return a 404
    if (!places || places.length === 0) {
      next({
        statusCode: 404,
        message: "Data not found",
      });
      return;
    }

    // Send the places as JSON response
    return res.status(200).json({ places });
  } catch (error: any) {
    next({
      statusCode: 500,
      message: "An error occurred while fetching the places",
    });
  }
};

// search places
export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 15;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

    // removing forward slash from pathname and replace dash into space
    const tag: string | null =
      typeof query.tag === "string"
        ? query.tag
            .split("")
            .filter((item: string) => item !== "/")
            .join("")
            .replace(/-/g, " ") // Replace dashes with spaces
        : null;

    const queryObj: IqueryObj = {};

    if (tag) {
      queryObj.tags = tag;
    }
    if (req.body.location) {
      if (req.body.location !== "I'm flexible") {
        queryObj.region = req.body.location as string;
      }
    }

    // Filter by startDate and endDate (checkIn/checkOut)
    if (req.body.startDate && req.body.endDate) {
      const userCheckIn = new Date(req.body.startDate.toString());
      const userCheckOut = new Date(req.body.endDate.toString());

      queryObj.$and = [
        // Place's check-in must be before or on the user's check-out
        {
          checkIn: { $lte: userCheckOut },
        },
        // Place's check-out must be after or on the user's check-in
        {
          checkOut: { $gte: userCheckIn },
        },
      ];
    }

    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "string") {
        queryObj[key] = { $regex: new RegExp(queryObj[key], "i") };
      }
    });

    let places;
    if (query.rent === "totalRentBeforeTaxes") {
      places = await placeModel.aggregate([
        {
          $match: Object.keys(queryObj).length > 0 ? { ...queryObj } : {},
        },
        {
          $lookup: {
            from: "hosts",
            localField: "hostRef",
            foreignField: "_id",
            as: "hostDetails",
          },
        },
        {
          $unwind: "$hostDetails",
        },
        {
          $addFields: {
            daysDifference: {
              $divide: [
                { $subtract: ["$checkOut", "$checkIn"] },
                1000 * 60 * 60 * 24,
              ],
            },
          },
        },
        {
          $addFields: {
            totalRent: {
              $multiply: ["$daysDifference", "$rent"],
            },
          },
        },
        {
          $set: {
            hostRef: "$hostDetails",
          },
        },
        {
          $unset: ["__v", "tags", "rent", "hostRef.__v"],
        },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            daysDifference: 0,
            updatedPrice: 0,
            hostDetails: 0,
          },
        },
      ]);
    } else {
      // Populate the host details
      places = await placeModel
        .find(Object.keys(queryObj).length > 0 ? { ...queryObj } : {})
        .populate({
          path: "hostRef",
          model: hostModel,
          select: { __v: 0 },
        })
        .select({ __v: 0, tags: 0 })
        .limit(limit)
        .skip(skip);
    }

    // Check if places exist, otherwise return value with region
    if (!places || places.length === 0) {
      if (query.rent === "totalRentBeforeTaxes") {
        places = await placeModel.aggregate([
          {
            $match:
              Object.keys(queryObj).length > 0
                ? { region: queryObj.region }
                : {},
          },
          {
            $lookup: {
              from: "hosts",
              localField: "hostRef",
              foreignField: "_id",
              as: "hostDetails",
            },
          },
          {
            $unwind: "$hostDetails",
          },
          {
            $addFields: {
              daysDifference: {
                $divide: [
                  { $subtract: ["$checkOut", "$checkIn"] },
                  1000 * 60 * 60 * 24,
                ],
              },
            },
          },
          {
            $addFields: {
              totalRent: {
                $multiply: ["$daysDifference", "$rent"],
              },
            },
          },
          {
            $set: {
              hostRef: "$hostDetails",
            },
          },
          {
            $unset: ["__v", "tags", "rent", "hostRef.__v"],
          },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              daysDifference: 0,
              updatedPrice: 0,
              hostDetails: 0,
            },
          },
        ]);
      } else {
        // Populate the host details
        places = await placeModel
          .find(
            Object.keys(queryObj).length > 0 ? { region: queryObj.region } : {}
          )
          .populate({
            path: "hostRef",
            model: hostModel,
            select: { __v: 0 },
          })
          .select({ __v: 0, tags: 0 })
          .limit(limit)
          .skip(skip);
      }
    }

    // Check if places exist, otherwise return a 404
    if (!places || places.length === 0) {
      next({
        statusCode: 404,
        message: "Data not found",
      });
      return;
    }

    const totalPlaces = await placeModel.countDocuments(
      Object.keys(queryObj).length > 0 ? { ...queryObj } : {}
    );
    const totalPages = Math.ceil(totalPlaces / limit);

    // Send the places as JSON response
    return res.status(200).json({ totalPages, currentPage: page, places });
  } catch (error: any) {
    // Return a more structured error response
    next({
      statusCode: 500,
      message: "An error occurred while fetching the places",
    });
  }
};

// search with total rent
export const searchTotalBeforeTaxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 15;
    const page = Number(query.page) || 1;

    // removing forward slash from pathname and replace dash in to space
    const tag: string | null =
      typeof query.tag === "string"
        ? query.tag
            .split("")
            .filter((item: string) => item !== "/")
            .join("")
            .replace(/-/g, " ") // Replace dashes with spaces
        : null;

    const queryObj: IqueryObj = {};

    if (tag) {
      queryObj.tags = tag;
    }
    if (req.body.location) {
      if (req.body.location !== "I'm flexible") {
        queryObj.region = req.body.location as string;
      }
    }
    if (req.body.startDate) {
      queryObj.checkIn = new Date(req.body.startDate.toString());
    }
    if (req.body.endDate) {
      queryObj.checkOut = new Date(req.body.endDate.toString());
    }

    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "string") {
        queryObj[key] = { $regex: new RegExp(queryObj[key], "i") };
      }
    });

    let places;
    if (query.rent === "totalRentBeforeTaxes") {
      places = await placeModel.aggregate([
        { $match: Object.keys(queryObj).length > 0 ? { ...queryObj } : {} },
        {
          $lookup: {
            from: "hosts",
            localField: "hostRef",
            foreignField: "_id",
            as: "hostDetails",
          },
        },
        {
          $unwind: "$hostDetails",
        },
        {
          $addFields: {
            daysDifference: {
              $divide: [
                { $subtract: ["$checkOut", "$checkIn"] },
                1000 * 60 * 60 * 24,
              ],
            },
          },
        },
        {
          $addFields: {
            totalRent: {
              $multiply: ["$daysDifference", "$rent"],
            },
          },
        },
        {
          $set: {
            hostRef: "$hostDetails",
          },
        },
        {
          $unset: ["__v", "tags", "rent", "hostRef.__v"],
        },
        {
          $limit: limit,
        },
        {
          $project: {
            daysDifference: 0,
            updatedPrice: 0,
            hostDetails: 0,
          },
        },
      ]);
    } else {
      // / Populate the host details
      places = await placeModel
        .find(Object.keys(queryObj).length > 0 ? { ...queryObj } : {})
        .populate({
          path: "hostRef",
          model: hostModel,
          select: { __v: 0 },
        })
        .select({ __v: 0, tags: 0 })
        .limit(limit);
    }

    // Check if places exist, otherwise return value with region
    if (!places || places.length === 0) {
      if (query.rent === "totalRentBeforeTaxes") {
        places = await placeModel.aggregate([
          {
            $match:
              Object.keys(queryObj).length > 0
                ? { region: queryObj.region }
                : {},
          },
          {
            $lookup: {
              from: "hosts",
              localField: "hostRef",
              foreignField: "_id",
              as: "hostDetails",
            },
          },
          {
            $unwind: "$hostDetails",
          },
          {
            $addFields: {
              daysDifference: {
                $divide: [
                  { $subtract: ["$checkOut", "$checkIn"] },
                  1000 * 60 * 60 * 24,
                ],
              },
            },
          },
          {
            $addFields: {
              totalRent: {
                $multiply: ["$daysDifference", "$rent"],
              },
            },
          },
          {
            $set: {
              hostRef: "$hostDetails",
            },
          },
          {
            $unset: ["__v", "tags", "rent", "hostRef.__v"],
          },
          {
            $limit: limit,
          },
          {
            $project: {
              daysDifference: 0,
              updatedPrice: 0,
              hostDetails: 0,
            },
          },
        ]);
      } else {
        // / Populate the host details
        places = await placeModel
          .find(
            Object.keys(queryObj).length > 0 ? { region: queryObj.region } : {}
          )
          .populate({
            path: "hostRef",
            model: hostModel,
            select: { __v: 0 },
          })
          .select({ __v: 0, tags: 0 })
          .limit(limit);
      }
    }

    // Check if places exist, otherwise return a 404
    if (!places || places.length === 0) {
      next({
        statusCode: 404,
        message: "Data not found",
      });
      return;
    }

    // Send the places as JSON response
    return res.status(200).json({ places });
  } catch (error: any) {
    console.error("Error fetching places:", error);
    // Return a more structured error response
    next({
      statusCode: 500,
      message: "An error occurred while fetching the places",
    });
  }
};
