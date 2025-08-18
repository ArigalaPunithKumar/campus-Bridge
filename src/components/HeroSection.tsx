import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Code, Brain, Users } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-cosmic overflow-hidden">
      {/* Beautiful Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero-enhanced opacity-90" />
      
      {/* Animated Background Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-primary opacity-30 animate-pulse"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)/0.2) 0%, transparent 50%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Mohan Babu <span className="text-accent-glow">University</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Excellence in education at Sree SaiNath Nagar, Rangampeta, Tirupati. 
            Advanced learning platform for academic and coding excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Start Learning Journey
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:shadow-glow">
            <div className="text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-accent-glow" />
              <h3 className="text-lg font-semibold mb-2">Academic LMS</h3>
              <p className="text-sm opacity-80">Complete learning management system for courses, assignments, and academic progress tracking.</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:shadow-glow">
            <div className="text-center">
              <Code className="h-12 w-12 mx-auto mb-4 text-accent-glow" />
              <h3 className="text-lg font-semibold mb-2">Coding Platform</h3>
              <p className="text-sm opacity-80">Online compiler, structured learning paths, and skill development tracks.</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:shadow-glow">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-accent-glow" />
              <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
              <p className="text-sm opacity-80">Real-time code hints, debugging assistance, and smart code review.</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:shadow-glow">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-accent-glow" />
              <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
              <p className="text-sm opacity-80">Live group coding rooms and collaborative problem-solving environments.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;