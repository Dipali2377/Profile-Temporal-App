import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://dipalim680:profiletemporal123@cluster0.pgjmy2h.mongodb.net/";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB successfully...");
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

export default connectDB;
