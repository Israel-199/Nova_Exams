const prisma = require("../prisma/client");
const cloudinary = require("../lib/cloudinary"); 

// Create Resource
exports.createResource = async (req, res) => {
  try {
    let sourceUrl = req.body.sourceUrl || null;
    let sourceType = req.body.sourceType || "url";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: req.body.type === "Video" ? "lib/video" : "lib/pdf",
        resource_type: req.body.type === "Video" ? "video" : "raw",
      });
      sourceUrl = uploadResult.secure_url;
      sourceType = "upload";
    }

    const resource = await prisma.resource.create({
      data: {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        sourceType,
        sourceUrl,
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

// Update Resource
exports.updateResource = async (req, res) => {
  try {
    let sourceUrl = req.body.sourceUrl || null;
    let sourceType = req.body.sourceType || "url";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: req.body.type === "Video" ? "lib/video" : "lib/pdf",
        resource_type: req.body.type === "Video" ? "video" : "raw",
      });
      sourceUrl = uploadResult.secure_url;
      sourceType = "upload";
    }

    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        sourceType,
        sourceUrl,
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
