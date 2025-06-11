import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
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
    <div className="min-h-screen bg-gradient-to-br from-[#282874] to-[#1f1f5e] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-[#282874] mb-2">Upload Profile Picture</h2>
        <p className="text-gray-500 text-sm mb-6">Help others recognize you</p>

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 mx-auto rounded-full border-4 border-[#282874] object-cover mb-4 shadow-md transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-4">
            No image
          </div>
        )}

        <label className="block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="inline-block bg-[#282874] text-white py-2 px-5 rounded-full text-sm font-medium hover:bg-[#1f1f5e] transition mb-6">
            Choose Image
          </span>
        </label>

        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`w-full py-2 rounded-full font-semibold transition ${
            selectedFile
              ? "bg-[#282874] text-white hover:bg-[#1f1f5e]"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddProfilePicture;
