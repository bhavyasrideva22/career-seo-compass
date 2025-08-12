import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  BarChart3,
  ArrowRight,
  Lightbulb,
  Brain,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-seo.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Comprehensive personality and interest assessment using validated psychological frameworks"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Technical Aptitude",
      description: "Evaluate your logical reasoning, analytical skills, and SEO knowledge foundation"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Six-dimensional readiness analysis: Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Personalized Results",
      description: "Detailed career guidance with actionable next steps and learning pathways"
    }
  ];

  const stats = [
    { label: "Assessment Duration", value: "20-30 min", icon: <Clock className="w-5 h-5" /> },
    { label: "Question Categories", value: "3 Sections", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Career Insights", value: "6 Dimensions", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Success Rate", value: "94% Accuracy", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-white/10 border-primary/20">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  AI-Powered Career Assessment
                </Badge>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Should I Learn
                  <span className="bg-gradient-primary bg-clip-text text-transparent block">
                    SEO Specialist?
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Discover if a career as an SEO Specialist aligns with your personality, skills, and interests through our comprehensive assessment.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => navigate("/assessment")}
                  className="text-lg px-8 py-4 h-auto"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="glass" size="lg" className="text-lg px-8 py-4 h-auto">
                  Learn More
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex items-center justify-center text-primary mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <img 
                src={heroImage} 
                alt="SEO Specialist working with analytics"
                className="relative rounded-3xl shadow-2xl w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive Career Assessment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our multi-dimensional assessment evaluates your readiness for an SEO career through validated 
              psychological frameworks and practical skill assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-medium hover:shadow-glow transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is SEO Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                What is an SEO Specialist?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                SEO (Search Engine Optimization) Specialists help websites rank higher in search results 
                through keyword research, content optimization, technical improvements, and data analysis.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Responsibilities:</h3>
                <ul className="space-y-3">
                  {[
                    "Keyword research and competitive analysis",
                    "On-page and technical SEO optimization",
                    "Content strategy and optimization",
                    "Link building and outreach campaigns",
                    "Performance tracking and reporting"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Success Traits:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Analytical thinking",
                    "Detail-oriented",
                    "Data-driven",
                    "Creative problem-solving",
                    "Continuous learning",
                    "Adaptability"
                  ].map((trait, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-accent text-white border-0 shadow-accent-glow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Average Salary Range</h3>
                  <div className="text-4xl font-bold mb-2">$45K - $120K</div>
                  <p className="text-white/80">
                    Entry level to senior positions, with remote work opportunities
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Career Growth Path</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span>Junior SEO Specialist</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span>SEO Specialist</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span>Senior SEO Manager</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span>Head of Digital Marketing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Discover Your SEO Potential?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Take our comprehensive assessment and get personalized insights about your 
            readiness for an SEO career in just 20-30 minutes.
          </p>
          <Button 
            variant="glass" 
            size="lg" 
            onClick={() => navigate("/assessment")}
            className="text-lg px-12 py-6 h-auto bg-white/20 hover:bg-white/30"
          >
            Start Your Assessment Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
