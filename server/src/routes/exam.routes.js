/** @format */

const express = require("express");
const {
  addExam,
  getLessonAndStudentNumbers,
  getExams,
} = require("../controllers/exam.controller");
const { validateExam } = require("../middlewares/exam.middleware");
const router = express.Router();

router.post("/addExam", validateExam, addExam);
router.get("/getLessonCodeAndStudentNum", getLessonAndStudentNumbers);
router.get("/exams", getExams);

module.exports = router;
