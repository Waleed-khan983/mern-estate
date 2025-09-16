import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logout,
} from "../redux/user/user";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [file, setFile] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(currentUser?.avatar || "");
  const [uploading, setUploading] = useState(false);

  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  // Upload when file changes
  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  // Upload to Cloudinary

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "image_preset");
      data.append("folder", "images");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyxhy8tg5/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadRes = await res.json();
      setUploading(false);

      if (uploadRes.secure_url) {
        setFileUrl(uploadRes.secure_url);
      }
    } catch (err) {
      setUploading(false);
      console.error("Upload error:", err);
    }
  };

  // Handle update form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`http://localhost:3000/user/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          ...(password && { password }),
          avatar: fileUrl,
        }),
      });

      const data = await res.json();
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      console.error("Update error:", err);
    }
  };

  // delete user
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:3000/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/login");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
  try {
    setShowListingError(false);
    const res = await axios.get(
      `http://localhost:3000/user/listings/${currentUser._id}`
    );

    console.log("Full response:", res.data); // 🔎 log what backend sends

    if (res.data.success === false) {
      setShowListingError(true);
      return;
    }

    setUserListings(res.data.listings);
    console.log("user listings:", res.data.listings); // 🔎 log parsed listings
  } catch (error) {
    console.error("Fetch error:", error); // 🔎 catch block
    setShowListingError(true);
  }
};


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Avatar */}
        <img
          src={fileUrl}
          alt="profile"
          className="rounded-full size-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />

        {uploading && (
          <p className="text-center text-sm text-gray-500">Uploading...</p>
        )}

        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5 ">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          delete Account
        </span>
        <span
          className="text-red-700 cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          sign out
        </span>
      </div>
      <p className="text-red-700 mt-3">{error ? error : ""}</p>
      <p className="text-green-700 mt-4">
        {updateSuccess ? "User Updated successfully" : ""}
      </p>
      <button onClick={handleShowListing} className="text-green-700 w-full  ">
        Show Listings
      </button>
      <p className="text-red-700 mt-5 ">
        {showListingError ? "Error showing listings " : ""}
      </p>
      {userListings &&
        userListings.length > 0 &&
        userListings.map((listing) => (
          <div className="" key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls?.[0]} alt="listing cover" />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Profile;
