// server/temporal/activities.js
import axios from "axios";
import userModel from "../models/userModel.js";
import connectDB from "../config/db.js";

export async function saveToCrudCrud(userData) {
  const { email, firstName, lastName } = userData;

  // ✅ Connect to MongoDB
  await connectDB();

  // ✅ Update MongoDB user
  try {
    const updated = await userModel.findOneAndUpdate(
      { email },
      { firstName, lastName },
      { new: true }
    );

    if (updated) {
      console.log("✅ MongoDB user updated:", updated);
    } else {
      console.log("⚠️ User not found in MongoDB");
    }
  } catch (err) {
    console.error("❌ MongoDB update failed:", err.message);
  }

  // ✅ Also update CrudCrud (optional delay)
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10s delay

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/ed4289d8113d47c4b1a59ae4ceb2eecc/profiles",
      userData
    );
    console.log("✅ CrudCrud updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ CrudCrud update failed:", error.message);
  }
}
