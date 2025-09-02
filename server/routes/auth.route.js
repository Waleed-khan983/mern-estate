import express from "express";
import { google, Login, register } from "../controller/auth.Controller.js";

const router = express.Router();

router.post("/register",  register);
router.post("/login", Login);
router.post('/google', google);

export default router;


