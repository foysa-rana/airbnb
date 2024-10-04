import { Router } from "express";
import {
  getAll,
  search,
  searchTotalBeforeTaxes,
  totalBeforeTaxes,
} from "../controllers/hostController.js";

const hostRouter = Router();

hostRouter.route("/").get(getAll).post(search);
hostRouter.route("/rent").get(totalBeforeTaxes).post(searchTotalBeforeTaxes);

export default hostRouter;
