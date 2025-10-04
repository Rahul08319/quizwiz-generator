import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  type: "multiple-choice" | "true-false";
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [question]);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswer(correct);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="w-full max-w-3xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-[var(--shadow-elegant)] border-primary/10">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              {question.question}
            </h2>

            <div className="grid gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const showCorrect = showFeedback && isCorrectAnswer;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={cn(
                      "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 font-medium",
                      "hover:border-primary hover:shadow-md disabled:cursor-not-allowed",
                      !showFeedback &&
                        "border-border bg-card hover:bg-primary/5",
                      showCorrect &&
                        "border-success bg-success/10 text-success-foreground",
                      showIncorrect &&
                        "border-destructive bg-destructive/10 text-destructive-foreground",
                      showFeedback &&
                        !isSelected &&
                        !isCorrectAnswer &&
                        "opacity-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      )}
                      {showIncorrect && (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={cn(
                  "p-4 rounded-lg border-2 animate-in fade-in slide-in-from-bottom-2 duration-500",
                  isCorrect
                    ? "bg-success/10 border-success text-success-foreground"
                    : "bg-destructive/10 border-destructive text-destructive-foreground"
                )}
              >
                <p className="font-semibold text-lg">
                  {isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
                </p>
                {!isCorrect && (
                  <p className="mt-1 text-sm opacity-90">
                    The correct answer was:{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            )}
          </div>

          {showFeedback && (
            <Button
              onClick={onNext}
              className="w-full mt-6 h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
            >
              {questionNumber === totalQuestions ? "View Results" : "Next Question"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuizQuestion;
