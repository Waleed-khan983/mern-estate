import Listing from "../model/listing.model.js";
export const createListing = async(req,res) =>{
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json({listing})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating listing",
            error: error.message
        })
    }
}