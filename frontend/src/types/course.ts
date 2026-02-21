import { ReactNode } from 'react';

export interface Lesson {
  title: string;
  content: () => ReactNode; // Content is a React component
  prevLesson?: string;
  nextLesson?: string;
}

export interface Module {
  [lessonId: string]: Lesson;
}

export interface CourseData {
  [moduleId: string]: Module;
}
