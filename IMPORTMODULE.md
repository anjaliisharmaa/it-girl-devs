// 1. Create lesson component in src/data/modules/{module-name}/{lesson-name}.tsx
export default function MyLessonContent() {
  return <>{/* Your JSX here */}</>;
}

// 2. Import and add to module index.ts
import MyLessonContent from './my-lesson';
export const myModule: Module = {
  'my-lesson': { title: '...', content: MyLessonContent, ... }
};
