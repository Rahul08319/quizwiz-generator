import { Question } from "@/components/QuizQuestion";

export const generateQuiz = (topic: string, difficulty: string): Question[] => {
  // Mock quiz data - in production, this would fetch from an API
  const quizzes: Record<string, Question[]> = {
    default: [
      {
        id: 1,
        question: `What is a fundamental concept in ${topic}?`,
        options: [
          "Option A - Basic principle",
          "Option B - Advanced theory",
          "Option C - Introductory concept",
          "Option D - Complex methodology"
        ],
        correctAnswer: 0,
        type: "multiple-choice"
      },
      {
        id: 2,
        question: `Which statement about ${topic} is true?`,
        options: ["True", "False"],
        correctAnswer: 0,
        type: "true-false"
      },
      {
        id: 3,
        question: `What is the best practice in ${topic}?`,
        options: [
          "Always use method A",
          "Consider context and requirements",
          "Never use method B",
          "Ignore best practices"
        ],
        correctAnswer: 1,
        type: "multiple-choice"
      },
      {
        id: 4,
        question: `${topic} requires continuous learning and practice.`,
        options: ["True", "False"],
        correctAnswer: 0,
        type: "true-false"
      },
      {
        id: 5,
        question: `Which of these is most important when studying ${topic}?`,
        options: [
          "Memorization only",
          "Understanding core concepts",
          "Speed over accuracy",
          "Ignoring fundamentals"
        ],
        correctAnswer: 1,
        type: "multiple-choice"
      }
    ]
  };

  // Adjust difficulty by modifying question complexity
  let questions = [...quizzes.default];
  
  if (difficulty === "easy") {
    questions = questions.slice(0, 3);
  } else if (difficulty === "hard") {
    questions = questions.concat([
      {
        id: 6,
        question: `What advanced technique is used in ${topic}?`,
        options: [
          "Basic approach",
          "Standard methodology",
          "Advanced optimization strategy",
          "Simple solution"
        ],
        correctAnswer: 2,
        type: "multiple-choice"
      },
      {
        id: 7,
        question: `Complex problems in ${topic} always have simple solutions.`,
        options: ["True", "False"],
        correctAnswer: 1,
        type: "true-false"
      }
    ]);
  }

  return questions;
};
