import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(""); // ✅ make it a string
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
  });

  console.log(formData);

  // Upload images to Cloudinary
  const uploadImage = async () => {
    if (!files || files.length === 0) {
      setError("Please select images to upload.");
      return;
    }

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("upload_preset", "listing_images");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dyxhy8tg5/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      }

      setUrls(uploadedUrls);
      console.log("Uploaded URLs:", uploadedUrls);
    } catch (err) {
      setError(err.message || "Image upload failed");
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (urls.length === 0) {
      setError("Please upload at least one image before submitting.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:3000/user/listing/create",
        { ...formData, imageUrls: urls, userRef: currentUser._id }
      );

      if (res.data.success === false) {
        setError(res.data.message || "Error creating listing");
      }

      console.log("Listing created:", res.data);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="1000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  {formData.type === "rent" && (
                    <span className="text-sm">($/Month)</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="50"
                  max="100000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  {formData.type === "rent" && (
                    <span className="text-sm">($/Month)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side (Images) */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border border-gray-300 p-3 rounded w-full"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={uploadImage}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>

          {/* Preview uploaded images */}
          {urls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt="listing"
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(url)}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
              >
                delete
              </button>
            </div>
          ))}

          <button className="p-3 text-white bg-slate-700 uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
            {loading ? "Creating..." : "Create Listing"}
          </button>

           {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
