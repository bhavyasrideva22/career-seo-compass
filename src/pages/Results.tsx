import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Target, 
  ArrowRight,
  Home
} from "lucide-react";

interface AssessmentAnswers {
  [key: string]: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scores, setScores] = useState<any>(null);
  const answers: AssessmentAnswers = location.state?.answers || {};

  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      navigate("/");
      return;
    }

    // Calculate scores based on answers
    const calculateScores = () => {
      // Interest scores (1-5 scale)
      const interestScores = [
        parseInt(answers.interest_1) || 0,
        parseInt(answers.interest_2) || 0
      ];
      const interestAvg = interestScores.reduce((a, b) => a + b, 0) / interestScores.length;
      const interestScore = (interestAvg / 5) * 100;

      // Technical aptitude scoring
      let technicalScore = 0;
      if (answers.logic_1 === "a") technicalScore += 25; // Correct answer
      if (answers.seo_knowledge === "ctr") technicalScore += 25; // Correct answer
      if (answers.analytics === "single_page") technicalScore += 25; // Correct answer
      
      // Personality scoring
      let personalityScore = 70; // Base score
      if (answers.personality_1 === "analytical") personalityScore += 20;
      if (answers.personality_1 === "creative") personalityScore += 15;

      // WISCAR Framework scores
      const wiscarScores = {
        will: answers.will_1 === "persist" ? 90 : 
              answers.will_1 === "ask_help" ? 75 : 
              answers.will_1 === "basic_fix" ? 50 : 30,
        
        interest: interestScore,
        
        skill: answers.skill_assessment === "expert" ? 95 :
               answers.skill_assessment === "intermediate" ? 75 :
               answers.skill_assessment === "beginner" ? 50 : 25,
        
        cognitive: technicalScore,
        
        ability: answers.learning_style === "hands_on" ? 85 :
                 answers.learning_style === "structured" ? 80 :
                 answers.learning_style === "video" ? 75 : 70,
        
        realWorld: Math.min(95, (personalityScore + technicalScore) / 2)
      };

      const overallScore = Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6;

      return {
        overall: Math.round(overallScore),
        psychometric: Math.round((interestScore + personalityScore) / 2),
        technical: Math.round(technicalScore),
        wiscar: wiscarScores,
        recommendation: overallScore >= 70 ? "highly_recommended" :
                       overallScore >= 50 ? "recommended" : "consider_alternatives"
      };
    };

    setScores(calculateScores());
  }, [answers, navigate]);

  if (!scores) {
    return <div className="min-h-screen flex items-center justify-center">Loading results...</div>;
  }

  const wiscarData = [
    { subject: 'Will', score: scores.wiscar.will, fullMark: 100 },
    { subject: 'Interest', score: scores.wiscar.interest, fullMark: 100 },
    { subject: 'Skill', score: scores.wiscar.skill, fullMark: 100 },
    { subject: 'Cognitive', score: scores.wiscar.cognitive, fullMark: 100 },
    { subject: 'Ability', score: scores.wiscar.ability, fullMark: 100 },
    { subject: 'Real-World', score: scores.wiscar.realWorld, fullMark: 100 },
  ];

  const barData = [
    { name: 'Psychometric Fit', score: scores.psychometric },
    { name: 'Technical Aptitude', score: scores.technical },
    { name: 'Overall Readiness', score: scores.overall }
  ];

  const getRecommendationContent = () => {
    switch (scores.recommendation) {
      case "highly_recommended":
        return {
          icon: <CheckCircle className="w-8 h-8 text-success" />,
          title: "Highly Recommended",
          description: "You show excellent potential for a successful career as an SEO Specialist!",
          badge: "success",
          advice: "You have strong analytical skills, genuine interest, and the right mindset for SEO. Start with foundational courses and hands-on practice."
        };
      case "recommended":
        return {
          icon: <TrendingUp className="w-8 h-8 text-warning" />,
          title: "Recommended with Preparation",
          description: "You have good potential but could benefit from some skill development.",
          badge: "warning",
          advice: "Focus on strengthening your technical knowledge and analytical skills. Consider starting with beginner-friendly SEO courses."
        };
      default:
        return {
          icon: <AlertCircle className="w-8 h-8 text-destructive" />,
          title: "Consider Alternative Paths",
          description: "SEO might not be the best fit based on your current profile.",
          badge: "destructive",
          advice: "Consider related fields like Content Marketing, Social Media Management, or General Digital Marketing that might align better with your strengths."
        };
    }
  };

  const recommendation = getRecommendationContent();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Your SEO Specialist Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, here's your comprehensive career readiness analysis
          </p>
        </div>

        {/* Overall Score */}
        <Card className="shadow-glow bg-gradient-card">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              {recommendation.icon}
              <h2 className="text-3xl font-bold ml-4">{recommendation.title}</h2>
            </div>
            <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              {scores.overall}%
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              {recommendation.description}
            </p>
            <Badge variant={recommendation.badge as any} className="text-sm px-4 py-2">
              Confidence Score: {scores.overall}/100
            </Badge>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Score Breakdown */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* WISCAR Radar Chart */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={wiscarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Your Score" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Psychometric Fit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={scores.psychometric} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Your personality and interests align {scores.psychometric >= 70 ? 'well' : scores.psychometric >= 50 ? 'moderately' : 'poorly'} with SEO work requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technical Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={scores.technical} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Your current technical knowledge is {scores.technical >= 70 ? 'strong' : scores.technical >= 50 ? 'moderate' : 'developing'}.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={scores.wiscar.ability} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  You show {scores.wiscar.ability >= 70 ? 'excellent' : scores.wiscar.ability >= 50 ? 'good' : 'developing'} potential for learning new SEO concepts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">{recommendation.advice}</p>
            
            {scores.recommendation !== "consider_alternatives" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Next Steps:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                    <span>Start with Google's SEO Starter Guide and Analytics Academy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                    <span>Practice keyword research using free tools like Google Keyword Planner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                    <span>Build a practice website and implement SEO techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                    <span>Join SEO communities and follow industry experts</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="pt-6 border-t">
              <h4 className="font-semibold text-lg mb-3">Recommended Career Paths:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {scores.recommendation !== "consider_alternatives" ? (
                  <>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h5 className="font-medium">SEO Specialist</h5>
                      <p className="text-sm text-muted-foreground">Focus on technical SEO and content optimization</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h5 className="font-medium">Digital Marketing Analyst</h5>
                      <p className="text-sm text-muted-foreground">Combine SEO with broader marketing analytics</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h5 className="font-medium">Content Marketing Specialist</h5>
                      <p className="text-sm text-muted-foreground">Focus on content creation and strategy</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h5 className="font-medium">Social Media Manager</h5>
                      <p className="text-sm text-muted-foreground">Leverage creativity in social platforms</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          <Button variant="hero" onClick={() => navigate("/assessment")} className="flex items-center gap-2">
            Retake Assessment
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;