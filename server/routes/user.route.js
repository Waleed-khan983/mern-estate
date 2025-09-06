import express from "express";
import { updateProfile } from "../controller/user.controller.js";

const router = express.Router();

router.put("/:id", updateProfile);

export default router
