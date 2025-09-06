import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(currentUser?.avatar || "");
  const [uploading, setUploading] = useState(false);

  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");

  // Upload when file changes
  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  // Upload to Cloudinary
  const uploadImage = async (file) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "image_preset"); // ✅ your preset
      data.append("folder", "images"); // ✅ your folder

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyxhy8tg5/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadRes = await res.json();
      console.log("Cloudinary response:", uploadRes);

      if (uploadRes.secure_url) {
        setFileUrl(uploadRes.secure_url); // update preview
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // Handle update form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/user/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          avatar: fileUrl, // ✅ send cloudinary url
        }),
      });

      const data = await res.json();
      console.log("Updated user:", data);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error("Update error:", err);
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
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">delete Account</span>
        <span className="text-red-700 cursor-pointer">sign out</span>
      </div>
    </div>
  );
};

export default Profile;
