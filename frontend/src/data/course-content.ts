// Course Content Database
// This acts as our mock database for the learning platform

export interface Lesson {
  title: string;
  videoId: string | null;
  content: string;
  nextLesson: string | null;
  prevLesson: string | null;
}

export interface Module {
  [lessonId: string]: Lesson;
}

export interface CourseData {
  [moduleId: string]: Module;
}

export const courseData: CourseData = {
  regression: {
    "intro-to-regression": {
      title: "Intro to Regression",
      videoId: null,
      content: "<h3>The Oracle Era 🔮</h3><p>Regression is basically the art of predicting the future. If you can predict a number (like salary, temperature, or stock price), you are doing regression.</p>",
      nextLesson: "simple-linear-regression",
      prevLesson: null
    },
    "simple-linear-regression": {
      title: "Simple Linear Regression",
      videoId: null,
      content: "<h3>The Bestie Relationship</h3><p>Does <b>x</b> affect <b>y</b>? That is the only question we are asking here. Think of it like: Does <i>Hours Spent Studying</i> affect <i>Exam Score</i>?</p>",
      nextLesson: "multiple-linear-regression",
      prevLesson: "intro-to-regression"
    },
    "multiple-linear-regression": {
      title: "Multiple Linear Regression",
      videoId: null,
      content: "<h3>It's Complicated</h3><p>Real life isn't just one variable. It's messy. Multiple Linear Regression looks at <i>everything</i> at once.</p>",
      nextLesson: null,
      prevLesson: "simple-linear-regression"
    }
  }
};
