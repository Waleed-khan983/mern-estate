import express from "express";
import { updateProfile, deleteUser } from "../controller/user.controller.js";

const router = express.Router();

router.put("/:id", updateProfile);
router.delete("/delete/:id", deleteUser);

export default router
