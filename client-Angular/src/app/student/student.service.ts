// lesson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  studentNum: number;
  name: string;
  surname: string;
  studentClass: number;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  addStudents(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/addStudent`, student);
  }
}
