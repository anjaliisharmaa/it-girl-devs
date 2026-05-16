import React from 'react';
import { Module } from '@/types/course';
import SimpleLinearContent from './simple-linear';

export const regressionModule: Module = {
  'intro-to-regression': {
    title: 'Intro to Regression',
    content: () => React.createElement('div', null, 'Coming soon'),
    metadata: {
      sipTime: '5 mins',
      difficulty: 'Zero to One (Super Beginner)',
      prerequisites: 'Just curiosity!'
    },
    prevLesson: undefined,
    nextLesson: 'simple-linear-regression',
  },
  'simple-linear-regression': {
    title: 'Simple Linear Regression',
    content: SimpleLinearContent,
    metadata: {
      sipTime: '8 mins',
      difficulty: 'First Date Energy (Beginner-Friendly)',
      prerequisites: 'Basic Python, knowing what a graph is'
    },
    prevLesson: 'intro-to-regression',
    nextLesson: 'multiple-linear-regression',
    datasetFile: 'latte.csv',
  },
  'multiple-linear-regression': {
    title: 'Multiple Linear Regression',
    content: () => React.createElement('div', null, 'Coming soon'),
    metadata: {
      sipTime: '12 mins',
      difficulty: 'It\'s Complicated (Intermediate)',
      prerequisites: 'Simple Linear Regression lesson'
    },
    prevLesson: 'simple-linear-regression',
    nextLesson: undefined,
  },
};
