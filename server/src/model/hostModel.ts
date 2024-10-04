import mongoose from "mongoose";

export interface Ihost extends mongoose.Document {
  Name: string;
  img: string;
}

const hostSchema: mongoose.Schema<Ihost> = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
});

const hostModel = mongoose.model<Ihost>("Host", hostSchema);

export { hostModel };
