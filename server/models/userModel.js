import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    city: String,
    pincode: String,
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
