const prisma = require("../prisma/client");

exports.createExam = async (req, res) => {
  const exam = await prisma.exam.create({ data: req.body });
  res.json(exam);
};

exports.getExams = async (req, res) => {
  const exams = await prisma.exam.findMany();
  res.json(exams);
};

exports.getExam = async (req, res) => {
  const exam = await prisma.exam.findUnique({ where: { id: req.params.id } });
  res.json(exam);
};

exports.updateExam = async (req, res) => {
  const exam = await prisma.exam.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(exam);
};

exports.deleteExam = async (req, res) => {
  await prisma.exam.delete({ where: { id: req.params.id } });
  res.json({ message: "Exam deleted" });
};
