const cloudinary = require("../lib/cloudinary");
const path = require("path");

const uploadToCloudinary = (fileBuffer, mimetype, folder, originalName = "file") => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(originalName) || "";
    // Strip extension from public_id to avoid ".pdf.pdf"
    const baseName = path.basename(originalName, ext).replace(/\s+/g, "_");

    // Decide resource type
    const resourceType =
      mimetype.startsWith("video/") ? "video" :
      mimetype.startsWith("image/") ? "image" :
      "raw";

    // Decide format explicitly
    let format;
    if (mimetype === "application/pdf") {
      format = "pdf";
    } else if (ext) {
      format = ext.replace(".", "");
    }

    const uploadOptions = {
      folder,
      public_id: baseName,        // 👈 no extension here
      resource_type: resourceType,
      format,                     // 👈 Cloudinary adds extension automatically
      overwrite: true,
      access_mode: "public",      // 👈 ensures public delivery
    };

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        reject(error);
      } else {
        console.log("Cloudinary upload result:", result);
        resolve(result); // contains secure_url + public_id
      }
    });

    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
