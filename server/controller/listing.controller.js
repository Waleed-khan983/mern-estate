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
        {new: true} // to return the updated document
    )

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

