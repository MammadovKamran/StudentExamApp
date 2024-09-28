/** @format */

import React, { useState, useEffect } from "react";
import { getStudents, addStudent, Student } from "../services/studentService";
import { getLessons, Lesson } from "../services/lessonService";

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    studentNum: 0,
    name: "",
    surname: "",
    studentClass: 0,
  });
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    fetchStudents();
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const data = await getLessons();
      setLessons(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await addStudent(newStudent);
      setNewStudent({ studentNum: 0, name: "", surname: "", studentClass: 0 });
      fetchStudents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Şagird əlavə et</h2>
      <div className="flex flex-col space-y-2 mb-6">
        <label>Şagirdin nömrəsi</label>
        <input
          type="number"
          className="border p-2"
          placeholder="Şagirdin nömrəsi"
          name="studentNum"
          value={newStudent.studentNum}
          onChange={handleInputChange}
        />{" "}
        <label>Şagirdin adı</label>
        <input
          type="text"
          className="border p-2"
          placeholder="Şagirdin adı"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
        />{" "}
        <label>Şagirdin soyadı</label>
        <input
          type="text"
          className="border p-2"
          placeholder="Şagirdin soyadı"
          name="surname"
          value={newStudent.surname}
          onChange={handleInputChange}
        />
        <label>Şagirdin sinifi</label>
        <select
          title="class"
          className="border p-2"
          name="studentClass"
          value={newStudent.studentClass}
          onChange={handleInputChange}
        >
          <option value={0}>Şagirdin sinifini seçin </option>
          {lessons.map((lesson) => (
            <option key={lesson.lessonCode} value={lesson.lessonClass}>
              Class {lesson.lessonClass} - {lesson.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white py-2 mt-4"
          onClick={handleAddStudent}
        >
          Add Student
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Şagird siyahısı</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Şagird nömrəsi</th>
              <th className="py-3 px-6 text-left">Ad</th>
              <th className="py-3 px-6 text-left">Soyad</th>
              <th className="py-3 px-6 text-left">Sinif</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {students.map((student) => (
              <tr
                key={student.studentNum}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.studentNum}
                </td>
                <td className="py-3 px-6 text-left">{student.name}</td>
                <td className="py-3 px-6 text-left">{student.surname}</td>
                <td className="py-3 px-6 text-left">{student.studentClass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
