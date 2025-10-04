import { useState } from "react";
import QuizConfig from "@/components/QuizConfig";
import QuizQuestion, { Question } from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import { generateQuiz } from "@/data/quizData";

type QuizState = "config" | "quiz" | "results";

const Index = () => {
  const [state, setState] = useState<QuizState>("config");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topic, setTopic] = useState("");

  const handleStartQuiz = (selectedTopic: string, difficulty: string) => {
    const quiz = generateQuiz(selectedTopic, difficulty);
    setQuestions(quiz);
    setTopic(selectedTopic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setState("quiz");
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setState("results");
    }
  };

  const handleRestart = () => {
    setState("config");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTopic("");
  };

  if (state === "config") {
    return <QuizConfig onStartQuiz={handleStartQuiz} />;
  }

  if (state === "quiz" && questions.length > 0) {
    return (
      <QuizQuestion
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    );
  }

  if (state === "results") {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        topic={topic}
        onRestart={handleRestart}
      />
    );
  }

  return null;
};

export default Index;
