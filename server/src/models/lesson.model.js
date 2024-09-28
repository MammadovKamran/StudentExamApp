/** @format */

const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lessonCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lessonClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  teacherName: { type: String, required: true },
  teacherSurname: { type: String, required: true },
});

module.exports = mongoose.model("Lesson", lessonSchema);
