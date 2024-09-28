/** @format */

const Exam = require("../models/exam.model");
const Lesson = require("../models/lesson.model");
const Student = require("../models/student.model");

const getLessonAndStudentNumbers = async (req, res) => {
  try {
    const students = await Student.find().select("studentNum -_id");
    const studentNumbers = students.map((student) => student.studentNum);

    const lessons = await Lesson.find().select("lessonCode -_id");
    const lessonCodes = lessons.map((lesson) => lesson.lessonCode);

    res.status(200).json({
      studentNumbers,
      lessonCodes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addExam = async (req, res) => {
  try {
    const { lessonCode, studentNum, examDate, score } = req.body;

    const lesson = await Lesson.findOne({ lessonCode });
    if (!lesson) {
      return res.status(404).json({ message: "Ders tapılmadı" });
    }

    const student = await Student.findOne({ studentNum });

    if (!student) {
      return res.status(404).json({ message: "Şagird tapılmadı" });
    }
    if (!student.studentClass.equals(lesson.lessonClass)) {
      return res.status(400).json({ message: "Şagird bu sinifdə deyil." });
    }
    const existingExam = await Exam.findOne({
      lessonCode: lesson._id,
      studentNum: student._id,
      examDate,
    });

    if (existingExam) {
      const formattedDate = new Date(existingExam.examDate).toLocaleDateString(
        "az-AZ",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      return res.status(400).json({
        message: `${student.name} adlı  şagird ${lesson.name} fənndən ${formattedDate} tarixində imtahan verib.`,
      });
    }
    const newExam = await Exam.create({
      lessonCode: lesson._id,
      studentNum: student._id,
      examDate,
      score,
    });

    res.status(201).json({ status: "OK", exam: newExam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getExams = async (req, res) => {
  try {
    let exams = await Exam.find()
      .populate({
        path: "lessonCode",
        select: "name lessonCode teacherSurname teacherName -_id",
        populate: { path: "lessonClass", select: "classname -_id" },
      })
      .populate({
        path: "studentNum",
        select: "name studentNum surname studentClass -_id ",
        populate: { path: "studentClass", select: "classname -_id" },
      });

    exams = exams.map((exam) => ({
      id: exam._id,
      lesson: {
        _id: exam.lessonCode._id,
        name: exam.lessonCode.name,
        lessonClass: exam.lessonCode.lessonClass,
        teacherName: exam.lessonCode.teacherName,
        teacherSurname: exam.lessonCode.teacherSurname,
      },
      student: {
        _id: exam.studentNum._id,
        name: exam.studentNum.name,
        surname: exam.studentNum.surname,
        studentClass: exam.studentNum.studentClass,
      },
      examDate: exam.examDate,
      score: exam.score,
      lessonCode: exam.lessonCode.lessonCode,
      studentNum: exam.studentNum.studentNum,
    }));

    if (!exams.length) {
      return res.status(404).json({ message: "Imtahan nəticələri tapılmadı." });
    }

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLessonAndStudentNumbers, addExam, getExams };
