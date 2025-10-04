import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, Sparkles } from "lucide-react";

interface QuizConfigProps {
  onStartQuiz: (topic: string, difficulty: string) => void;
}

const QuizConfig = ({ onStartQuiz }: QuizConfigProps) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStartQuiz(topic, difficulty);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <Card className="w-full max-w-lg p-8 shadow-[var(--shadow-elegant)] border-primary/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-[var(--shadow-elegant)]">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Quiz Generator
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge on any topic
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-base font-semibold">
              Quiz Topic
            </Label>
            <Input
              id="topic"
              placeholder="e.g., World History, Science, Programming..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-12 border-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-base font-semibold">
              Difficulty Level
            </Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="h-12 border-primary/20 focus:border-primary transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - Beginner Friendly</SelectItem>
                <SelectItem value="medium">Medium - Intermediate</SelectItem>
                <SelectItem value="hard">Hard - Expert Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[var(--shadow-elegant)]"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Quiz
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default QuizConfig;
