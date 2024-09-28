import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from './student.service';
import { LessonService, Lesson } from '../lesson/lesson.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  students: Student[] = [];
  lessons: Lesson[] = [];

  newStudent: Student = {
    studentNum: 0,
    name: '',
    surname: '',
    studentClass: 0,
  };

  constructor(
    private studentService: StudentService,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    this.getStudents();
    this.getLessons();
  }

  getStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  getLessons() {
    this.lessonService.getLessons().subscribe((data) => {
      this.lessons = data;
    });
  }

  handleAddStudent() {
    this.studentService.addStudents(this.newStudent).subscribe((student) => {
      this.getStudents();
      this.resetForm();
    });
  }

  resetForm() {
    this.newStudent = {
      studentNum: 0,
      name: '',
      surname: '',
      studentClass: 0,
    };
  }
}
