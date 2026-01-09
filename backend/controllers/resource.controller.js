const prisma = require("../prisma/client");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// Create Resource
exports.createResource = async (req, res) => {
  try {
    const { type, title, description, pdfUploadMode, videoType } = req.body;

    if (!type || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: type, title, description",
      });
    }

    let sourceUrl = req.body.url || null;
    let sourceType = "url";

    // Handle file upload
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        type === "video" ? "lib/video" : "lib/pdf"
      );
      sourceUrl = uploadResult.secure_url;
      sourceType = "upload";
    }

    const resource = await prisma.resource.create({
      data: {
        type, // "pdf" or "video"
        title,
        description,
        sourceType, // "url" or "upload"
        sourceUrl,
        pdfUploadMode: type === "pdf" ? pdfUploadMode || "url" : null,
        videoType: type === "video" ? videoType || "youtube" : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create resource",
      error: error.message,
    });
  }
};

// Update Resource
exports.updateResource = async (req, res) => {
  try {
    const { type, title, description, pdfUploadMode, videoType } = req.body;

    let sourceUrl = req.body.url || null;
    let sourceType = "url";

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        type === "video" ? "lib/video" : "lib/pdf"
      );
      sourceUrl = uploadResult.secure_url;
      sourceType = "upload";
    }

    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: {
        type,
        title,
        description,
        sourceType,
        sourceUrl,
        pdfUploadMode: type === "pdf" ? pdfUploadMode || "url" : null,
        videoType: type === "video" ? videoType || "youtube" : null,
      },
    });

    res.json({
      success: true,
      message: "Resource updated successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update resource",
      error: error.message,
    });
  }
};

// Get All Resources
exports.getResources = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json({
      success: true,
      message: "Resources fetched successfully",
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
      error: error.message,
    });
  }
};

// Get Single Resource
exports.getResource = async (req, res) => {
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: req.params.id },
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      message: "Resource fetched successfully",
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resource",
      error: error.message,
    });
  }
};


// Delete Resource
exports.deleteResource = async (req, res) => {
  try {
    await prisma.resource.delete({ where: { id: req.params.id } });
    res.json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};
