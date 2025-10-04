import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, TrendingUp } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  topic: string;
  onRestart: () => void;
}

const QuizResults = ({
  score,
  totalQuestions,
  topic,
  onRestart,
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", message: "Outstanding!", emoji: "🌟" };
    if (percentage >= 80) return { grade: "A", message: "Excellent!", emoji: "🎉" };
    if (percentage >= 70) return { grade: "B", message: "Great Job!", emoji: "👏" };
    if (percentage >= 60) return { grade: "C", message: "Good Effort!", emoji: "👍" };
    return { grade: "D", message: "Keep Practicing!", emoji: "📚" };
  };

  const result = getGrade();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <Card className="w-full max-w-2xl p-8 shadow-[var(--shadow-elegant)] border-primary/10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-elegant)] animate-in zoom-in duration-500">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Quiz Complete! {result.emoji}
            </h1>
            <p className="text-xl text-muted-foreground">
              {topic}
            </p>
          </div>

          <div className="py-8 space-y-4">
            <div className="inline-block">
              <div className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in zoom-in duration-700">
                {percentage}%
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">
                Grade: {result.grade}
              </div>
              <p className="text-xl text-muted-foreground">{result.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6 bg-secondary/50 rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">{score}</span>
              </div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {totalQuestions - score}
              </div>
              <p className="text-sm text-muted-foreground">Incorrect Answers</p>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[var(--shadow-elegant)]"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Another Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizResults;
