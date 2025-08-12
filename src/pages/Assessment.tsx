import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const sections = [
    {
      title: "Interest & Personality Assessment",
      description: "Understanding your interests and personality traits",
      questions: [
        {
          id: "interest_1",
          question: "How interested are you in analyzing website performance data?",
          options: [
            { value: "5", label: "Extremely interested - I love diving into data" },
            { value: "4", label: "Very interested - Data analysis excites me" },
            { value: "3", label: "Moderately interested - It seems useful" },
            { value: "2", label: "Slightly interested - Not my favorite but okay" },
            { value: "1", label: "Not interested - I prefer other activities" }
          ]
        },
        {
          id: "personality_1",
          question: "When working on a project, I prefer to:",
          options: [
            { value: "analytical", label: "Break it down systematically and analyze each part" },
            { value: "creative", label: "Brainstorm creative solutions and approaches" },
            { value: "collaborative", label: "Work with others to gather different perspectives" },
            { value: "independent", label: "Work independently with minimal supervision" }
          ]
        },
        {
          id: "interest_2",
          question: "How do you feel about staying updated with constantly changing algorithms?",
          options: [
            { value: "5", label: "Excited - I love learning about new updates" },
            { value: "4", label: "Positive - I enjoy staying current" },
            { value: "3", label: "Neutral - I'll do it if needed" },
            { value: "2", label: "Concerned - It seems overwhelming" },
            { value: "1", label: "Stressed - I prefer stable environments" }
          ]
        }
      ]
    },
    {
      title: "Technical Aptitude",
      description: "Evaluating your technical readiness and logical thinking",
      questions: [
        {
          id: "logic_1",
          question: "If website A has 1000 visitors and 50 conversions, and website B has 2000 visitors and 80 conversions, which has better conversion performance?",
          options: [
            { value: "a", label: "Website A (5% conversion rate)" },
            { value: "b", label: "Website B (4% conversion rate)" },
            { value: "equal", label: "They perform equally" },
            { value: "insufficient", label: "Need more information to determine" }
          ]
        },
        {
          id: "seo_knowledge",
          question: "What is the primary purpose of meta descriptions in SEO?",
          options: [
            { value: "ranking", label: "To directly improve search engine rankings" },
            { value: "ctr", label: "To improve click-through rates from search results" },
            { value: "speed", label: "To make websites load faster" },
            { value: "social", label: "To enhance social media sharing" }
          ]
        },
        {
          id: "analytics",
          question: "In Google Analytics, what does 'bounce rate' measure?",
          options: [
            { value: "speed", label: "How fast pages load" },
            { value: "single_page", label: "Percentage of single-page sessions" },
            { value: "errors", label: "Number of error pages encountered" },
            { value: "mobile", label: "Mobile vs desktop usage" }
          ]
        }
      ]
    },
    {
      title: "WISCAR Framework Assessment",
      description: "Comprehensive readiness evaluation across six key dimensions",
      questions: [
        {
          id: "will_1",
          question: "When facing a challenging SEO problem with no clear solution, I would:",
          options: [
            { value: "persist", label: "Research extensively and experiment until I find a solution" },
            { value: "ask_help", label: "Seek help from experienced professionals" },
            { value: "basic_fix", label: "Apply basic fixes and move on" },
            { value: "avoid", label: "Avoid such complex problems if possible" }
          ]
        },
        {
          id: "skill_assessment",
          question: "How would you rate your current understanding of how search engines work?",
          options: [
            { value: "expert", label: "Expert - I understand algorithms and ranking factors deeply" },
            { value: "intermediate", label: "Intermediate - I know the basics and some advanced concepts" },
            { value: "beginner", label: "Beginner - I understand basic concepts" },
            { value: "none", label: "No understanding - This would be completely new to me" }
          ]
        },
        {
          id: "learning_style",
          question: "When learning new SEO tools or techniques, I prefer:",
          options: [
            { value: "hands_on", label: "Hands-on experimentation and practice" },
            { value: "structured", label: "Structured courses and step-by-step guides" },
            { value: "video", label: "Video tutorials and visual demonstrations" },
            { value: "reading", label: "Reading documentation and case studies" }
          ]
        }
      ]
    }
  ];

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const currentQuestionIndex = sections.slice(0, currentSection).reduce((sum, section) => sum + section.questions.length, 0);
  const progress = ((currentQuestionIndex + Object.keys(answers).filter(key => 
    sections[currentSection].questions.some(q => q.id === key)
  ).length) / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Navigate to results with answers
      navigate("/results", { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentSectionAnswered = sections[currentSection].questions.every(
    question => answers[question.id]
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SEO Specialist Assessment
            </h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + Object.keys(answers).filter(key => 
                sections[currentSection].questions.some(q => q.id === key)
              ).length} / {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="text-xl">
              {sections[currentSection].title}
            </CardTitle>
            <p className="text-muted-foreground">
              {sections[currentSection].description}
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {sections[currentSection].questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">
                  {index + 1}. {question.question}
                </h3>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="mt-1" />
                      <Label 
                        htmlFor={`${question.id}-${option.value}`}
                        className="text-sm leading-relaxed cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!currentSectionAnswered}
            className="flex items-center gap-2"
            size="lg"
          >
            {currentSection === sections.length - 1 ? "View Results" : "Next Section"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;