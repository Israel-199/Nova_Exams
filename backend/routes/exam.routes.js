const router = require("express").Router();
const c = require("../controllers/exam.controller");

router.post("/", c.createExam);
router.get("/", c.getExams);
router.get("/:id", c.getExam);
router.put("/:id", c.updateExam);
router.delete("/:id", c.deleteExam);

module.exports = router;
