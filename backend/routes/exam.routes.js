const express = require("express");
const router = express.Router();
const examController = require("../controllers/exam.controller");

// Create exam
router.post("/", examController.createExam);

// Get all exams
router.get("/", examController.getExams);

// Get single exam by ID
router.get("/:id", examController.getExam);

// Update exam by ID
router.patch("/:id", examController.updateExam);

// Delete exam by ID
router.delete("/:id", examController.deleteExam);

module.exports = router;


