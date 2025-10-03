import Listing from "../model/listing.model.js";
export const createListing = async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // 👈 log data from frontend

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
    const listing = await Listing.findById(id); // 👈 capital L
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "listing not found",
      });
    }
    // if(req.user.id !== listing.userRef){
    //     return res.status(401).json({
    //         success: false,
    //         message: "Your are not authorized to delete this listing",
    //     })
    // }
    await Listing.findByIdAndDelete(id);
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

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // find if listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // if(req.user.id !== listing.userRef){
    //     return  res.status(401).json({
    //         success: false,
    //         message: "You are not authorized to update this listing",
    //     })
    // }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // to return the updated document
    );

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating listing",
      error: error.message,
    });
  }
};

export const getListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    // ✅ Fix for sort/order
    const sortField =
      req.query.sort && req.query.sort !== "undefined"
        ? req.query.sort
        : "createdAt";

    const sortOrder =
      req.query.order && req.query.order !== "undefined" && req.query.order === "asc"
        ? 1
        : -1; // default to descending

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sortField]: sortOrder })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    console.error("Error in getListings:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
