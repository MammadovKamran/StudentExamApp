/** @format */

import React, { useState, useEffect } from "react";
import {
  getExams,
  addExam,
  Exam,
  DetailedExam,
  getLessonCodeAndStudentNum,
} from "../services/examService";

const Exams = () => {
  const [exams, setExams] = useState<DetailedExam[]>([]);
  const [lessonCode, setLessonCode] = useState<string[]>([]);
  const [studentNum, setStudentNum] = useState<number[]>([]);
  const [newExam, setNewExam] = useState<Exam>({
    lessonCode: "",
    studentNum: 0,
    examDate: "",
    score: 0,
  });

  const fetchExams = async () => {
    try {
      const data = await getExams();
      setExams(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLessonCodeAndStudentNum = async () => {
    try {
      const data = await getLessonCodeAndStudentNum();
      setLessonCode(data.lessonCodes);
      setStudentNum(data.studentNumbers);
      console.log(data.lessonCodes, data.studentNumbers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExams();
    fetchLessonCodeAndStudentNum();
  }, []);

  const handleAddExam = async () => {
    try {
      await addExam(newExam);
      setNewExam({ lessonCode: "", studentNum: 0, examDate: "", score: 0 });
      fetchExams();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">İmtahan əlavə et</h2>
      <div className="flex flex-col space-y-2 mb-6">
        <label>Dərs kodu</label>
        <select
          title="lessonCode"
          className="border p-2"
          name="lessonCode"
          value={newExam.lessonCode}
          onChange={(e) => setNewExam({ ...newExam, lessonCode: e.target.value })}
        >
          <option value="">Dərs kodunu seçin</option>
          {lessonCode.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <label>Şagirdin nömrəsi</label>
        <select
          title="studentNum"
          className="border p-2"
          name="studentNum"
          value={newExam.studentNum}
          onChange={(e) =>
            setNewExam({ ...newExam, studentNum: parseInt(e.target.value) })
          }
        >
          <option value={0}>Şagirdin nömrəsi seçin</option>
          {studentNum.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <label>İmtahan tarixi</label>
        <input
          type="date"
          className="border p-2"
          placeholder="Exam Date"
          value={newExam.examDate}
          onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
        />{" "}
        <label>Şagirdin qiyməti</label>
        <input
          type="number"
          className="border p-2"
          placeholder="Grade"
          value={newExam.score}
          onChange={(e) =>
            setNewExam({ ...newExam, score: parseInt(e.target.value) })
          }
        />
        <button className="bg-blue-600 text-white py-2 mt-4" onClick={handleAddExam}>
          Nəticələri daxil et
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">İmtahan siyahısı</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Dərs</th>
              <th className="py-3 px-6 text-left">Sinif</th>
              <th className="py-3 px-6 text-left">Şagird</th>
              <th className="py-3 px-6 text-left">Müəllim</th>
              <th className="py-3 px-6 text-left">Tarix</th>
              <th className="py-3 px-6 text-left">Qiymət</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {exams.map((exam) => (
              <tr
                key={exam.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {exam.lesson.name}
                </td>
                <td className="py-3 px-6 text-left">
                  {exam.lesson.lessonClass.classname}
                </td>
                <td className="py-3 px-6 text-left">
                  {exam.student.name} {exam.student.surname}
                </td>
                <td className="py-3 px-6 text-left">
                  {exam.lesson.teacherName} {exam.lesson.teacherSurname}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(exam.examDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>

                <td className="py-3 px-6 text-left">{exam.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exams;
