import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StudentDashboard from "@/components/StudentDashboard";
import AcademicSection from "@/components/AcademicSection";
import CodingSection from "@/components/CodingSection";
import CollaborativeSection from "@/components/CollaborativeSection";
import SettingsSection from "@/components/SettingsSection";
import AchievementsSection from "@/components/AchievementsSection";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [currentView, setCurrentView] = useState("hero");
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && currentView !== "hero") {
      navigate("/auth");
    }
  }, [user, loading, currentView, navigate]);

  const handleGetStarted = () => {
    setCurrentView("dashboard");
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setCurrentView("dashboard");
  };

  const renderContent = () => {
    if (currentView === "hero") {
      return <HeroSection />;
    }

    switch (activeSection) {
      case "dashboard":
        return <StudentDashboard />;
      case "academic":
        return <AcademicSection />;
      case "coding":
        return <CodingSection />;
      case "collaborative":
        return <CollaborativeSection />;
      case "achievements":
        return <AchievementsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <StudentDashboard />;
    }
  };

  if (currentView === "hero") {
    return (
      <div className="min-h-screen">
        <HeroSection />
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-4">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-hero text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow transition-all duration-300 mr-4"
              >
                Access Student Portal
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;