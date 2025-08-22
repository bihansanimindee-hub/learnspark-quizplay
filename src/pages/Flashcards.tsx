import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
}

const sampleFlashcards: Flashcard[] = [
  {
    id: 1,
    front: "What is photosynthesis?",
    back: "Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water, releasing oxygen as a byproduct.",
    subject: "Biology",
    difficulty: "medium"
  },
  {
    id: 2,
    front: "Where does photosynthesis occur?",
    back: "Photosynthesis occurs in the chloroplasts of plant cells, specifically in structures called thylakoids where chlorophyll captures light energy.",
    subject: "Biology", 
    difficulty: "easy"
  },
  {
    id: 3,
    front: "What are the two main stages of photosynthesis?",
    back: "The two main stages are: 1) Light-dependent reactions (occur in thylakoids) and 2) Calvin cycle or light-independent reactions (occur in the stroma).",
    subject: "Biology",
    difficulty: "hard"
  },
  {
    id: 4,
    front: "What is the chemical equation for photosynthesis?",
    back: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂ (Carbon dioxide + water + light energy → glucose + oxygen)",
    subject: "Biology",
    difficulty: "medium"
  },
  {
    id: 5,
    front: "What is chlorophyll and what does it do?",
    back: "Chlorophyll is a green pigment found in chloroplasts that absorbs light energy (primarily red and blue wavelengths) and reflects green light, which is why plants appear green.",
    subject: "Biology",
    difficulty: "easy"
  }
];

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(sampleFlashcards);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setCurrentCard(0);
    setIsFlipped(false);
    setShuffled(true);
  };

  const handleReset = () => {
    setCards(sampleFlashcards);
    setCurrentCard(0);
    setIsFlipped(false);
    setShuffled(false);
  };

  const currentFlashcard = cards[currentCard];
  const difficultyColors = {
    easy: "bg-success/10 text-success border-success/30",
    medium: "bg-warning/10 text-warning border-warning/30", 
    hard: "bg-destructive/10 text-destructive border-destructive/30"
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Flashcards</h1>
          <p className="text-muted-foreground">
            Review key concepts with interactive flashcards
          </p>
          <ProgressBar 
            value={currentCard + 1} 
            max={cards.length}
            label={`Card ${currentCard + 1} of ${cards.length}`}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2">
          <Button 
            onClick={handleShuffle}
            variant="outline" 
            size="sm"
            className="flex items-center space-x-2"
          >
            <Shuffle className="h-4 w-4" />
            <span>Shuffle</span>
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline" 
            size="sm"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        </div>

        {/* Flashcard */}
        <div className="relative">
          <Card 
            className={`
              card-learning cursor-pointer transition-all duration-300 min-h-[300px] 
              ${isFlipped ? 'transform rotate-y-180' : ''}
              hover:shadow-[var(--shadow-soft)]
            `}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardHeader className="text-center relative">
              <div className="flex items-center justify-between mb-2">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium border
                  ${difficultyColors[currentFlashcard.difficulty]}
                `}>
                  {currentFlashcard.difficulty}
                </span>
                <span className="text-sm text-muted-foreground">
                  {currentFlashcard.subject}
                </span>
              </div>
              <CardTitle className="text-center">
                {isFlipped ? "Answer" : "Question"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center text-center">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {isFlipped ? currentFlashcard.back : currentFlashcard.front}
                </p>
                <div className="flex items-center justify-center text-muted-foreground">
                  {isFlipped ? (
                    <EyeOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm">
                    {isFlipped ? "Click to see question" : "Click to reveal answer"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="sm"
              className="rounded-full w-8 h-8 p-0 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4">
            <Button
              onClick={handleNext}
              variant="outline"
              size="sm"
              className="rounded-full w-8 h-8 p-0 shadow-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="card-learning">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setIsFlipped(!isFlipped)}
                variant="outline" 
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>{isFlipped ? "Show Question" : "Show Answer"}</span>
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-gradient-learning hover:opacity-90"
              >
                <span>Next Card</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Progress */}
        <Card className="card-learning">
          <CardHeader>
            <CardTitle className="text-lg">Study Session Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">12</div>
                <p className="text-sm text-muted-foreground">Cards Reviewed</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">8</div>
                <p className="text-sm text-muted-foreground">Minutes Spent</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">85%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {shuffled && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              <Shuffle className="h-4 w-4" />
              <span>Cards have been shuffled</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Flashcards;