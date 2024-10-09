import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnect from "./db/dbConnect.js";
import hostRouter from "./routes/hostRoute.js";
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddlware from "./middleware/errorHandlerMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/places", hostRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddlware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnect(process.env.MONGODB_ATLAS_URI || "");
    app.listen(port, () => {
      console.log(`server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
