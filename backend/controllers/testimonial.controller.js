const prisma = require("../prisma/client");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// Create Testimonial
// Create Testimonial
exports.createTestimonial = async (req, res) => {
  try {
    let imageUrl;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "testimonials"
      );
      imageUrl = uploadResult.secure_url;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        student: req.body.student,
        exam: req.body.exam,
        score: req.body.score,
        testimonial: req.body.testimonial,
        ...(imageUrl && { image: imageUrl }), // ✅ only set if file uploaded
      },
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Testimonial
exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: req.params.id },
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      message: "Testimonial fetched successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial",
      error: error.message,
    });
  }
};

// Update Testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    let imageUrl;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "testimonials"
      );
      imageUrl = uploadResult.secure_url;
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: {
        student: req.body.student,
        exam: req.body.exam,
        score: req.body.score,
        testimonial: req.body.testimonial,
        ...(imageUrl ? { image: imageUrl } : {}), // ✅ keep old image if none uploaded
      },
    });

    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get All Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json({
      success: true,
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};
