/** @format */

const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Class", classSchema);
