const multer = require("multer");
const path = require("path");

// Use memory storage so files are kept in RAM
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const url = req.originalUrl.toLowerCase();

  // Testimonials → only images
  if (url.includes("testimonials")) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false); // reject file but don't crash
    }
  }

  // Resources → only video or PDF
  else if (url.includes("resources")) {
    if (
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/x-pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  // Default → reject
  else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
