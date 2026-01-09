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

    // Handle PDF upload
    if (req.files?.pdfFile) {
      const file = req.files.pdfFile[0];
      const uploadResult = await uploadToCloudinary(file.buffer, file.mimetype, "lib/pdf");
      sourceUrl = uploadResult.secure_url;
      sourceType = "upload";
    }

    // Handle Video upload
    if (req.files?.videoFile) {
      const file = req.files.videoFile[0];
      const uploadResult = await uploadToCloudinary(file.buffer, file.mimetype, "lib/video");
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

    // Build update data dynamically
    const updateData = {};

    if (type) updateData.type = type;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (pdfUploadMode && type === "pdf") updateData.pdfUploadMode = pdfUploadMode;
    if (videoType && type === "video") updateData.videoType = videoType;

    // Handle URL if provided
    if (req.body.url) {
      updateData.sourceUrl = req.body.url;
      updateData.sourceType = "url";
    }

    // Handle PDF upload
    if (req.files?.pdfFile) {
      const file = req.files.pdfFile[0];
      const uploadResult = await uploadToCloudinary(file.buffer, file.mimetype, "lib/pdf");
      updateData.sourceUrl = uploadResult.secure_url;
      updateData.sourceType = "upload";
    }

    // Handle Video upload
    if (req.files?.videoFile) {
      const file = req.files.videoFile[0];
      const uploadResult = await uploadToCloudinary(file.buffer, file.mimetype, "lib/video");
      updateData.sourceUrl = uploadResult.secure_url;
      updateData.sourceType = "upload";
    }

    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: updateData,
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
