import express from "express";
import { getAllUsers, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/login", loginUser);

export default userRouter;
