import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
  await mongoose.connect("mongodb://127.0.0.1:27017/issue-tracker");
  console.debug("Connected to mongodb...");
};
