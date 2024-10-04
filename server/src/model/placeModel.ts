import mongoose from "mongoose";
import { Ihost } from "./hostModel.js";

interface Iplace extends mongoose.Document {
  title: string;
  city: string;
  country: string;
  region: string;
  checkIn: Date;
  checkOut: Date;
  rent: number;
  image: string;
  tags: string;
  hostRef: mongoose.ObjectId | Ihost;
  rating: number;
}

const placeSchema: mongoose.Schema<Iplace> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  region: {
    type: String,
    required: true,
    trim: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
    trim: true,
  },
  rent: {
    type: Number,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: String,
    required: true,
    trim: true,
  },
  hostRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const placeModel = mongoose.model<Iplace>("Place", placeSchema);

export { placeModel };
