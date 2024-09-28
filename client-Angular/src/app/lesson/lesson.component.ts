import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessonService, Lesson } from './lesson.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
})
export class LessonComponent {
  newLesson: Lesson = {
    lessonCode: '',
    name: '',
    lessonClass: 0,
    teacherName: '',
    teacherSurname: '',
  };

  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessonService.getLessons().subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (err) => {
        console.error('Dersler yüklenirken hata:', err);
      },
    });
  }

  handleAddLesson() {
    this.lessonService.addLesson(this.newLesson).subscribe({
      next: (addedLesson) => {
        console.log('Yeni Ders Eklendi:', addedLesson);
        this.loadLessons();
        this.resetForm();
      },
      error: (err) => {
        console.error('Ders eklenirken hata:', err);
      },
    });
  }

  resetForm() {
    this.newLesson = {
      lessonCode: '',
      name: '',
      lessonClass: 0,
      teacherName: '',
      teacherSurname: '',
    };
  }
}
