require("dotenv").config();
import mongoose, { ConnectOptions } from "mongoose";

const uri = process.env.MONGODB_URI || "";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
