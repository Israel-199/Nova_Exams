const router = require("express").Router();
const c = require("../controllers/testimonial.controller");

router.post("/", c.createTestimonial);
router.get("/", c.getTestimonials);
router.put("/:id", c.updateTestimonial);
router.delete("/:id", c.deleteTestimonial);

module.exports = router;
