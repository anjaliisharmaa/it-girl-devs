import { ReactNode } from 'react';

export interface LessonMetadata {
  sipTime: string;
  difficulty: string;
  prerequisites: string;
}

export interface Lesson {
  title: string;
  content?: () => ReactNode; // Content is a React component (optional for backward compatibility)
  markdownContent?: string; // Raw markdown string for rendering with ReactMarkdown
  metadata?: LessonMetadata;
  prevLesson?: string;
  nextLesson?: string;
  datasetFile?: string; // Optional dataset file name
  projectRubric?: string; // Optional AI evaluator rubric for coding projects
}

export interface Module {
  [lessonId: string]: Lesson;
}

export interface CourseData {
  [moduleId: string]: Module;
}
