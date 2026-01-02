const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial.controller");

// Create testimonial
router.post("/", testimonialController.createTestimonial);

// Get all testimonials
router.get("/", testimonialController.getTestimonials);

// Update testimonial by ID
router.put("/:id", testimonialController.updateTestimonial);

// Delete testimonial by ID
router.delete("/:id", testimonialController.deleteTestimonial);

module.exports = router;


