import express from "express";
import { createListing, deleteListing, updateListing } from "../controller/listing.controller.js";

const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", deleteListing);
router.post("/update/:id", updateListing);
export default router; 