/** @format */

export interface Exam {
  id?: number;
  lessonCode: string;
  studentNum: number;
  examDate: string;
  score: number;
}

export interface DetailedExam {
  id?: number;
  lesson: {
    name: string;
    teacherName: string;
    teacherSurname: string;
    lessonClass: {
      classname: string;
    };
  };
  student: {
    _id: string;
    name: string;
    surname: string;
    studentClass: {
      classname: string;
    };
  };
  examDate: string;
  score: number;
}

const EXAMS_API_URL = "http://localhost:5000/api";

export const getExams = async (): Promise<DetailedExam[]> => {
  const response = await fetch(`${EXAMS_API_URL}/exams`);
  if (!response.ok) {
    throw new Error("Failed to fetch exams");
  }
  return response.json();
};

export const getLessonCodeAndStudentNum = async () => {
  const response = await fetch(`${EXAMS_API_URL}/getLessonCodeAndStudentNum`);
  if (!response.ok) {
    throw new Error("Failed to fetch exams");
  }
  return response.json();
};

export const addExam = async (newExam: Exam): Promise<Exam> => {
  const response = await fetch(`${EXAMS_API_URL}/addExam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExam),
  });
  if (!response.ok) {
    throw new Error("Failed to add exam");
  }
  return response.json();
};
