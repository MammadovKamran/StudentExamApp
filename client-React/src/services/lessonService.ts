/** @format */

export interface Lesson {
  id?: number;
  lessonCode: string;
  name: string;
  lessonClass: number;
  teacherName: string;
  teacherSurname: string;
}

const LESSONS_API_URL = "http://localhost:5000/api"; 

export const getLessons = async (): Promise<Lesson[]> => {
  const response = await fetch(`${LESSONS_API_URL}/lessons`);
  if (!response.ok) {
    throw new Error("Failed to fetch lessons");
  }
  return response.json();
};

export const addLesson = async (newLesson: Lesson): Promise<Lesson> => {
  const response = await fetch(`${LESSONS_API_URL}/addLesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLesson),
  });
  if (!response.ok) {
    throw new Error("Failed to add lesson");
  }
  return response.json();
};
