/** @format */

const express = require("express");
const { addLesson, getLessons } = require("../controllers/lesson.controller");
const { validateLesson } = require("../middlewares/lesson.middleware");
const router = express.Router();

router.post("/addLesson", validateLesson, addLesson);
router.get("/lessons", getLessons);

module.exports = router;
