const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial.controller");
const upload = require("../middleware/upload");

router.post(
  "/testimonials",
  upload.single("image"), 
  testimonialController.createTestimonial
);

router.patch(
  "/testimonials/:id",
  upload.single("image"), 
  testimonialController.updateTestimonial
);

router.get("/testimonials", testimonialController.getTestimonials);   // ✅ fixed
router.get("/testimonials/:id", testimonialController.getTestimonial);
router.delete("/testimonials/:id", testimonialController.deleteTestimonial);

module.exports = router;
