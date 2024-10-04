import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./dist/db/dbConnect.js";
import { hostModel } from "./dist/model/hostModel.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_ATLAS_URI);
    await hostModel.deleteMany();
    const jsonHost = JSON.parse(
      await fs.readFile(new URL("./MOCK_DATA_Name.json", import.meta.url))
    );
    await hostModel.create(jsonHost);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
start();
