import { Module } from '@/types/course';
import SimpleLinearContent from './simple-linear';

export const regressionModule: Module = {
  'simple-linear-regression': {
    title: 'Simple Linear Regression',
    content: SimpleLinearContent,
    prevLesson: undefined,
    nextLesson: undefined,
  },
};
