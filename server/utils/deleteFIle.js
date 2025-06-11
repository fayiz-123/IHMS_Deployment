const fs = require("fs");
const path = require("path");

const deleteFile = (relativeFilePath) => {
  try {
    const fullPath = path.join(__dirname, "..", relativeFilePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("File deleted:", fullPath);
    } else {
      console.log("File not found:", fullPath);
    }
  } catch (err) {
    console.error("Error deleting file:", err.message);
  }
};

module.exports = deleteFile;
