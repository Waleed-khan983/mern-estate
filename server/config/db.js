import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Connection Error", err);
  }
};

export default Connect;
