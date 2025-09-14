import express from "express";
import { updateProfile, deleteUser , getUserlistings } from "../controller/user.controller.js";

const router = express.Router();

router.put("/:id", updateProfile);
router.delete("/delete/:id", deleteUser);
router.get('/listings/:id', getUserlistings)

export default router
