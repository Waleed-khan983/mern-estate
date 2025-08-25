import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exist",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User registerd successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    // next(error);
  }
};
