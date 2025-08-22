import { useState } from "react";
import { Upload, FileText, Wand2, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContentInput = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to process.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Content Processed!",
        description: "Your quiz has been generated and saved.",
        variant: "default"
      });
      
      // Clear form
      setContent("");
      setSubject("");
    }, 2000);
  };

  const sampleContent = `Photosynthesis is the process by which plants convert light energy into chemical energy. This process occurs in the chloroplasts of plant cells and involves two main stages: the light-dependent reactions and the Calvin cycle. During photosynthesis, plants absorb carbon dioxide from the atmosphere and water from the soil, using sunlight to produce glucose and oxygen.`;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Add Study Content</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Paste or type your study material, and our AI will automatically generate quiz questions and flashcards for you.
          </p>
        </div>

        {/* Content Input Form */}
        <Card className="card-learning">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Study Material</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject (Optional)</Label>
              <Input
                id="subject"
                placeholder="e.g., Biology, Mathematics, History..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Study Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your study notes, textbook excerpts, or any learning material here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] bg-background resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {content.length} characters • Minimum 50 characters recommended
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleSubmit}
                disabled={isProcessing || content.length < 50}
                className="flex-1 bg-gradient-learning hover:opacity-90"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Quiz & Flashcards
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setContent(sampleContent)}
                size="lg"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Try Sample Content
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-learning">
            <CardHeader>
              <CardTitle className="text-lg">Upload Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOC, TXT files
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-learning">
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  More detailed content generates better questions
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Include key terms, definitions, and concepts
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Structured content works best (headings, bullet points)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContentInput;