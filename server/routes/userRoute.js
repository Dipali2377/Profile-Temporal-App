import express from "express";
import {
  getAllUsers,
  getUserByEmail,
  loginUser,
  updateUserByEmail,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/login", loginUser);
userRouter.get("/:email", getUserByEmail);
userRouter.put("/:email", updateUserByEmail);

export default userRouter;
