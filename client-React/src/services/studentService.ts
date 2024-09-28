/** @format */

export interface Student {
  id?: number;
  studentNum: number;
  name: string;
  surname: string;
  studentClass: number;
}

const LESSONS_API_URL = "http://localhost:5000/api";

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${LESSONS_API_URL}/students`);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

export const addStudent = async (newStudent: Student): Promise<Student> => {
  const response = await fetch(`${LESSONS_API_URL}/addStudent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStudent),
  });
  if (!response.ok) {
    throw new Error("Failed to add student");
  }
  return response.json();
};
