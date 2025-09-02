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
      return res.status(400).json({
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
          user: {
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name, // adjust to your schema
          },
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

// export const google = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);

      

//     } else {
//       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(generatedPassword, 10);
//       const newUser = new userModel({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo})

//       await newUser.save(); 
//       const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY);
//       const {password: pass, ...rest} = newUser._doc;
//       res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
//         console.log("Google signup/login response:", rest);
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const google = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      // ✅ Update avatar if Google provides a new one
      if (req.body.photo && user.avatar !== req.body.photo) {
        user.avatar = req.body.photo;
        await user.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // Generate a random password since Google login skips normal signup
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // ✅ Save Google profile image as avatar
      const newUser = new userModel({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar:
          req.body.photo ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

