import userModel from "../models/userModel.js";

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

export { getAllUsers, loginUser };
