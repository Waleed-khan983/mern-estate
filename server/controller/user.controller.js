import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params; // user id from URL
    const { password, ...others } = req.body;

    // If password is being updated → hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      others.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: others }, // update avatar, username, etc.
      { new: true } // return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Error updating profile", error: err });
  }
};
