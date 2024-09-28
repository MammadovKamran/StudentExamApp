/** @format */

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentNum: { type: Number, required: true, unique: true },
  studentClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  name: { type: String, required: true },
  surname: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
