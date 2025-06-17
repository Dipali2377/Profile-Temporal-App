// server/temporal/activities.ts
import axios from "axios";
import userModel from "../models/userModel.js";
import connectDB from "../config/db.js";

// ✅ Export interface for workflow typing
export interface SaveToCrudCrudInput {
  email: string;
  firstName: string;
  lastName: string;
}

export async function saveToCrudCrud(
  userData: SaveToCrudCrudInput
): Promise<any> {
  const { email, firstName, lastName } = userData;

  // ✅ Connect to MongoDB
  await connectDB();

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
  } catch (err: any) {
    console.error("❌ MongoDB update failed:", err.message);
  }

  // ✅ Delay before CrudCrud
  await new Promise((resolve) => setTimeout(resolve, 10000));

  try {
    console.log("📦 Sending to CrudCrud:", userData);
    const response = await axios.post(
      "https://crudcrud.com/api/ed4289d8113d47c4b1a59ae4ceb2eecc/profiles",
      userData
    );
    console.log("✅ CrudCrud updated:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ CrudCrud update failed:", error.message);
  }
}
