import mongoose from "mongoose";
import dotenv from "dotenv";
import Url from "./urlModel.js";
import User from "./userModel.js";

dotenv.config();

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = mongoose.connection.readyState;
    console.log("DB connection successful!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export const handler = async (event, context) => {
  await connectToDatabase();

  try {
    console.log("fetching");
    const result = await Url.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching data" }),
    };
  }
};
