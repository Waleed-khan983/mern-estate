import express from "express";
import { updateProfile, deleteUser , getUserlistings, getUser   } from "../controller/user.controller.js";

const router = express.Router();

router.put("/:id", updateProfile);
router.delete("/delete/:id", deleteUser);
router.get('/listings/:id', getUserlistings)
router.get('/:id',  getUser)
export default router
