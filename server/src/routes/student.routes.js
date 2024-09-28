/** @format */

const express = require("express");
const { addStudent, getStudents } = require("../controllers/student.controller");
const { validateStudent } = require("../middlewares/student.middleware");
const router = express.Router();

router.post("/addStudent",validateStudent, addStudent);
router.get("/students", getStudents);

module.exports = router;
