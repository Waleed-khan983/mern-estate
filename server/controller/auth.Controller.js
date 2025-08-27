import userModel from "../model/userModel.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
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

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).jsin({
        success: false,
        message: "User not found",
      });
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!comparePassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          success: true,
          message: "User Login successfully",
          token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
