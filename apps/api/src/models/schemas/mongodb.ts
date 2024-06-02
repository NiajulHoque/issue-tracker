import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    telegramId: Number,
    createdAt: String, // ISO 2024-06-01T18:09:40.000Z
  },
  {
    versionKey: false,
  }
);
export const UserModel = mongoose.model("User", userSchema, "users");
