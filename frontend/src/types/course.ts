import { ReactNode } from 'react';

export interface LessonMetadata {
  sipTime: string;
  difficulty: string;
  prerequisites: string;
}

export interface Lesson {
  title: string;
  content: () => ReactNode; // Content is a React component
  metadata?: LessonMetadata;
  prevLesson?: string;
  nextLesson?: string;
  datasetFile?: string; // Optional dataset file name
}

export interface Module {
  [lessonId: string]: Lesson;
}

export interface CourseData {
  [moduleId: string]: Module;
}
