import Listing from "../model/listing.model.js";
export const createListing = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);  // 👈 log data from frontend

    const listing = await Listing.create(req.body);

    return res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("❌ Create listing error:", error); // 👈 log the real error
    res.status(500).json({
      success: false,
      message: "Error creating listing",
      error: error.message,
    });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);  // 👈 capital L
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "listing not found",
      });
    }
    await Listing.findByIdAndDelete(id);  // 👈 capital L
    return res.status(200).json({
      success: true,
      message: "listing deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting listing",
      error: error.message,
    });
  }
};
