import { useState } from "react";
import { Check, X, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary purpose of photosynthesis in plants?",
    options: [
      "To produce oxygen for animals",
      "To convert light energy into chemical energy",
      "To absorb carbon dioxide from the atmosphere",
      "To create chlorophyll in plant cells"
    ],
    correctAnswer: 1,
    explanation: "Photosynthesis primarily converts light energy into chemical energy (glucose), which plants use for growth and metabolism.",
    subject: "Biology"
  },
  {
    id: 2,
    question: "Where does photosynthesis occur in plant cells?",
    options: [
      "In the nucleus",
      "In the mitochondria", 
      "In the chloroplasts",
      "In the cell wall"
    ],
    correctAnswer: 2,
    explanation: "Photosynthesis occurs in the chloroplasts, which contain chlorophyll and other pigments necessary for capturing light energy.",
    subject: "Biology"
  },
  {
    id: 3,
    question: "What are the two main stages of photosynthesis?",
    options: [
      "Respiration and transpiration",
      "Light-dependent reactions and Calvin cycle",
      "Absorption and emission",
      "Growth and reproduction"
    ],
    correctAnswer: 1,
    explanation: "The two main stages are the light-dependent reactions (which capture energy) and the Calvin cycle (which produces glucose).",
    subject: "Biology"
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(sampleQuestions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(sampleQuestions.length).fill(null));
    setShowResult(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    const correct = selectedAnswers.reduce((count, answer, index) => {
      return answer === sampleQuestions[index].correctAnswer ? count + 1 : count;
    }, 0);
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const currentQ = sampleQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  if (quizCompleted) {
    const score = calculateScore();
    const correctCount = selectedAnswers.filter((answer, index) => 
      answer === sampleQuestions[index].correctAnswer
    ).length;

    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <Card className="card-learning text-center">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-learning rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-foreground">{score}%</div>
                <p className="text-muted-foreground">
                  You got {correctCount} out of {sampleQuestions.length} questions correct
                </p>
              </div>

              <ProgressBar 
                value={score} 
                variant={score >= 80 ? "success" : score >= 60 ? "default" : "warning"}
                showLabel={false}
              />

              <div className="text-sm text-muted-foreground">
                {score >= 80 && "Excellent work! You've mastered this topic."}
                {score >= 60 && score < 80 && "Good job! Keep practicing to improve."}
                {score < 60 && "Keep studying! Review the material and try again."}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={resetQuiz}
                  className="flex-1"
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  className="flex-1 bg-gradient-learning hover:opacity-90"
                  onClick={() => window.location.href = '/content'}
                >
                  Add More Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Biology Quiz</h1>
          <ProgressBar 
            value={currentQuestion + 1} 
            max={sampleQuestions.length}
            label={`Question ${currentQuestion + 1} of ${sampleQuestions.length}`}
          />
        </div>

        {/* Question Card */}
        <Card className="card-learning">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                let optionClass = "quiz-option";
                
                if (showResult) {
                  if (index === currentQ.correctAnswer) {
                    optionClass = "quiz-option-correct";
                  } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                    optionClass = "quiz-option-incorrect";
                  } else {
                    optionClass = "quiz-option opacity-50";
                  }
                } else if (selectedAnswer === index) {
                  optionClass = "quiz-option border-primary/70 bg-primary/10";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={optionClass}
                    disabled={showResult}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium
                        ${showResult && index === currentQ.correctAnswer 
                          ? "border-success bg-success text-success-foreground" 
                          : showResult && index === selectedAnswer && index !== currentQ.correctAnswer
                          ? "border-destructive bg-destructive text-destructive-foreground"
                          : "border-current"
                        }
                      `}>
                        {showResult && index === currentQ.correctAnswer ? (
                          <Check className="h-4 w-4" />
                        ) : showResult && index === selectedAnswer && index !== currentQ.correctAnswer ? (
                          <X className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-left flex-1">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className={`
                p-4 rounded-lg border-l-4 animate-fade-in
                ${isCorrect 
                  ? "bg-success-light border-success" 
                  : "bg-destructive-light border-destructive"
                }
              `}>
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                  <span className="font-medium text-sm">
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm opacity-90">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <Button 
                onClick={handleNext}
                className="w-full bg-gradient-learning hover:opacity-90"
                size="lg"
              >
                {currentQuestion < sampleQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  "Complete Quiz"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Quiz;