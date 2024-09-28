/** @format */

const mongoose = require("mongoose");

const examShema = new mongoose.Schema({
  lessonCode: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Lesson",
  },
  studentNum: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  examDate: {
    type: Date,
    required: true,
  },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("Exam", examShema);
