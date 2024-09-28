/** @format */
const Lesson = require("../models/lesson.model");
const Class = require("../models/class.model");
const addLesson = async (req, res) => {
  try {
    const { lessonCode, name, lessonClass, teacherName, teacherSurname } = req.body;

    const findLesson = await Lesson.findOne({ lessonCode });
    if (findLesson) {
      return res.status(401).json({ message: `Bu ders hal-hazirda movcuddur!` });
    }

    let findedClass = await Class.findOne({ classname: lessonClass });
    if (!findedClass) {
      findedClass = await Class.create({ classname: lessonClass });
    }

    const newLesson = await Lesson.create({
      lessonCode,
      name,
      lessonClass: findedClass._id,
      teacherName,
      teacherSurname,
    });

    res.status(201).json({ status: "OK", newLesson, lessonClass: findedClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLessons = async (req, res) => {
  try {
    let lessons = await Lesson.find().populate({
      path: "lessonClass",
      select: "classname -_id",
    });
    lessons = lessons.map((lesson) => ({
      ...lesson._doc,
      lessonClass: lesson.lessonClass ? lesson.lessonClass.classname : null,
    }));
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: "Dərs tapilmadi" });
    }

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addLesson, getLessons };
