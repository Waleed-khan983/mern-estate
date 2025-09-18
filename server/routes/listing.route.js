import express from "express";
import { createListing, deleteListing } from "../controller/listing.controller.js";

const router = express.Router();

router.post("/create", createListing)
router.delete("/delete/:id", deleteListing)
export default router; 