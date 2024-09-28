import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  lessonCode: string;
  studentNum: number;
  examDate: string;
  score: number;
}

const EXAMS_API_URL = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  getExams(): Observable<DetailedExam[]> {
    return this.http.get<DetailedExam[]>(`${EXAMS_API_URL}/exams`);
  }

  getLessonCodeAndStudentNum(): Observable<any> {
    return this.http.get(`${EXAMS_API_URL}/getLessonCodeAndStudentNum`);
  }

  addExam(newExam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${EXAMS_API_URL}/addExam`, newExam);
  }
}
