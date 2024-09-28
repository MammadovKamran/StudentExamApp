/** @format */
const Student = require("../models/student.model");
const Class = require("../models/class.model");

const addStudent = async (req, res) => {
  try {
    const { studentNum, studentClass, name, surname } = req.body;

    const classData = await Class.findOne({ classname: studentClass });

    if (!classData) {
      return res.status(404).json({ message: "Sinif tapilmadi !" });
    }

    const findStudent = await Student.findOne({ studentNum });
    if (findStudent) {
      return res
        .status(401)
        .json({ message: "Bu nömrə ilə şagird bu sinifdə movcuddur!" });
    }

    const newStudent = await Student.create({
      studentNum,
      studentClass: classData._id,
      name,
      surname,
    });

    res.status(201).json({ status: "OK", newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    let students = await Student.find().populate({
      path: "studentClass",
      select: "classname -_id",
    });
    students = students.map((student) => ({
      ...student._doc,
      studentClass: student.studentClass ? student.studentClass.classname : null,
    }));
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Dərs tapilmadi" });
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addStudent, getStudents };
