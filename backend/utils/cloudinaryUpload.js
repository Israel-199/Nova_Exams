// utils/cloudinaryUpload.js
const cloudinary = require("../lib/cloudinary");

const uploadToCloudinary = (fileBuffer, mimetype, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: mimetype.startsWith("video/")
          ? "video"
          : mimetype.startsWith("image/")
          ? "image"
          : "raw",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
