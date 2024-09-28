/** @format */

import React, { useState, useEffect } from "react";
import { getLessons, addLesson, Lesson } from "../services/lessonService";

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLesson, setNewLesson] = useState<Lesson>({
    lessonCode: "",
    name: "",
    lessonClass: 0,
    teacherName: "",
    teacherSurname: "",
  });

  const fetchLessons = async () => {
    try {
      const data = await getLessons();
      setLessons(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLesson({ ...newLesson, [name]: value });
  };

  const handleAddLesson = async () => {
    try {
      await addLesson(newLesson);
      setNewLesson({
        lessonCode: "",
        name: "",
        lessonClass: 0,
        teacherName: "",
        teacherSurname: "",
      });
      fetchLessons();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dərs əlavə et</h2>
      <div className="flex flex-col space-y-2 mb-6">
        <label>Dərs kodu</label>
        <input
          type="text"
          className="border p-2"
          placeholder="Dərs kodu"
          name="lessonCode"
          value={newLesson.lessonCode}
          onChange={handleInputChange}
        />
        <label>Dərs adı</label>

        <input
          type="text"
          className="border p-2"
          placeholder="Dərs adı"
          name="name"
          value={newLesson.name}
          onChange={handleInputChange}
        />
        <label>Sinif</label>

        <input
          type="number"
          className="border p-2"
          placeholder="Sinif"
          name="lessonClass"
          value={newLesson.lessonClass}
          onChange={handleInputChange}
        />
        <label>Müəllimin adı</label>

        <input
          type="text"
          className="border p-2"
          placeholder="Müəllimin adı"
          name="teacherName"
          value={newLesson.teacherName}
          onChange={handleInputChange}
        />
        <label>Müəllimin soyadı</label>

        <input
          type="text"
          className="border p-2"
          placeholder="Müəllimin soyadı"
          name="teacherSurname"
          value={newLesson.teacherSurname}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-600 text-white py-2 mt-4"
          onClick={handleAddLesson}
        >
          Əlavə et{" "}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Dərs siyahısı</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Dərs Kodu</th>
              <th className="py-3 px-6 text-left">Dərs</th>
              <th className="py-3 px-6 text-left">Sinif</th>
              <th className="py-3 px-6 text-left">Müəllim</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {lessons.map((lesson) => (
              <tr
                key={lesson.lessonCode}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {lesson.lessonCode}
                </td>
                <td className="py-3 px-6 text-left">{lesson.name}</td>
                <td className="py-3 px-6 text-left">{lesson.lessonClass}</td>
                <td className="py-3 px-6 text-left">
                  {lesson.teacherName} {lesson.teacherSurname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lessons;
