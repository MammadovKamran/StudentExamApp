import { Component, OnInit } from '@angular/core';
import { ExamService, Exam, DetailedExam } from './exam.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit {
  exams: DetailedExam[] = [];
  lessonCodes: string[] = [];
  studentNumbers: number[] = [];
  newExam: Exam = {
    lessonCode: '0',
    studentNum: 0,
    examDate: '',
    score: 0,
  };

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadExams();
    this.loadLessonCodesAndStudentNums();
  }

  loadExams(): void {
    this.examService.getExams().subscribe({
      next: (data) => {
        this.exams = data;
      },
      error: (err) => {
        console.error('Failed to load exams', err);
      },
    });
  }

  loadLessonCodesAndStudentNums(): void {
    this.examService.getLessonCodeAndStudentNum().subscribe({
      next: (data) => {
        this.lessonCodes = data.lessonCodes;
        this.studentNumbers = data.studentNumbers;
      },
      error: (err) => {
        console.error('Failed to load lesson codes and student numbers', err);
      },
    });
  }

  addExam(): void {
    this.examService.addExam(this.newExam).subscribe({
      next: (exam) => {
        console.log('Exam added', exam);
        this.loadExams();
      },
      error: (err) => {
        console.error('Failed to add exam', err);
      },
    });
  }
}
