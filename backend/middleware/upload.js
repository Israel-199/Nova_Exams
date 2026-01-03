const multer = require("multer");

// Use memory storage so files are kept in RAM
const storage = multer.memoryStorage();

// Flexible filter: decide based on route
const fileFilter = (req, file, cb) => {
  const url = req.originalUrl.toLowerCase();

  // Testimonials → only images
  if (url.includes("testimonials")) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for testimonials"), false);
    }
  }

  // Resources → only video or PDF
  else if (url.includes("resources")) {
    if (file.mimetype.startsWith("video/") || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only video and PDF files are allowed for resources"), false);
    }
  }

  // Default → reject
  else {
    cb(new Error("Invalid upload route"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
