const prisma = require("../prisma/client");

// Create Exam
exports.createExam = async (req, res) => {
  const { examType, mentorship, examRoomService, sum } = req.body;

  // Validation
  if (
    !examType ||
    !mentorship ||
    examRoomService === undefined ||
    sum === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const exam = await prisma.exam.create({ data: req.body });
    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create exam",
      error: error.message,
    });
  }
};

// Get All Exams
exports.getExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany();
    res.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
      error: error.message,
    });
  }
};

// Get Single Exam
exports.getExam = async (req, res) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: req.params.id },
    });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }
    res.json({
      success: true,
      message: "Exam fetched successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exam",
      error: error.message,
    });
  }
};

// Update Exam
exports.updateExam = async (req, res) => {
  try {
    const exam = await prisma.exam.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Exam updated successfully",
      data: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update exam",
      error: error.message,
    });
  }
};

// Delete Exam
exports.deleteExam = async (req, res) => {
  try {
    await prisma.exam.delete({ where: { id: req.params.id } });
    res.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete exam",
      error: error.message,
    });
  }
};
