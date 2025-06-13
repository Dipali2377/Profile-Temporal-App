import userModel from "../models/userModel.js";
import { Connection, Client } from "@temporalio/client";

const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        firstName,
        lastName,
      });
    }
    res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserByEmail = async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  try {
    const connection = await Connection.connect();
    const client = new Client({ connection });

    const handle = await client.workflow.start("saveUserDataWorkflow", {
      args: [{ email, ...updatedData }],
      taskQueue: "user-profile-task-queue",
      workflowId: `update-${email}-${Date.now()}`,
    });

    console.log(`Workflow started: ${handle.workflowId}`);

    res.status(200).json({ message: "Workflow started to update user." });
  } catch (error) {
    console.error("Error starting workflow:", error);
    res.status(500).json({ error: "Failed to update user via workflow." });
  }
};

export { getAllUsers, loginUser, getUserByEmail, updateUserByEmail };
