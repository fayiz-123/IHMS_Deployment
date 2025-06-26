import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

    setUploading(true); // start loader
    setPreview(null); // ❌ Don't show preview yet

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized. Please log in again.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pic", file);

    try {
      const { data } = await axios.put(
        `${baseApiUrl}/profile-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setProfilePic(data.user.profilePic); // ✅ set only after upload succeeds
        alert("✅ Profile picture uploaded successfully.");
      } else {
        alert("❌ Image upload failed.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.post(`${baseApiUrl}/uploadProfilePic`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-16">
      <div className="bg-white shadow-md rounded-xl flex flex-col md:flex-row items-center gap-10 p-8 w-full max-w-3xl">
        {/* Left: Image Preview */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-44 h-44 rounded-full object-cover border-4 border-[#1f1f5e] shadow"
            />
          ) : (
            <div className="w-44 h-44 rounded-full bg-gray-100 border-2 border-[#1f1f5e] flex items-center justify-center text-gray-400 text-5xl">
              👤
            </div>
          )}
          <p className="mt-3 text-gray-500 text-sm">Profile Preview</p>
        </div>

        {/* Right: Instructions + Upload */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-semibold text-[#1f1f5e] mb-2">Update Profile Picture</h2>
          <p className="text-gray-600 text-sm mb-6">
            Select a clear photo so others can recognize you.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
            <label className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="bg-[#1f1f5e] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#15154c] transition font-medium shadow">
                Choose File
              </span>
            </label>

            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className={`px-6 py-2 rounded-md font-medium transition shadow ${
                selectedFile
                  ? "bg-[#1f1f5e] text-white hover:bg-[#15154c]"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfilePicture;
