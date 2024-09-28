import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { StudentComponent } from './student/student.component';
import { ExamComponent } from './exam/exam.component';

export const routes: Routes = [
  { path: 'lessons', component: LessonComponent },
  { path: 'students', component: StudentComponent },
  { path: 'exams', component: ExamComponent },
  { path: '', redirectTo: '/lessons', pathMatch: 'full' },
];
