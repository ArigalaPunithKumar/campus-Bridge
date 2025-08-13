import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StudentDashboard from "@/components/StudentDashboard";
import AcademicSection from "@/components/AcademicSection";
import CodingSection from "@/components/CodingSection";
import SettingsSection from "@/components/SettingsSection";
import AchievementsSection from "@/components/AchievementsSection";

const Index = () => {
  const [currentView, setCurrentView] = useState("hero");
  const [activeSection, setActiveSection] = useState("dashboard");

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
        return (
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Collaborative Features</h2>
            <p className="text-muted-foreground">Coming soon - Live group coding rooms and pair programming</p>
          </div>
        );
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
          <div className="text-center">
            <button
              onClick={handleGetStarted}
              className="bg-gradient-hero text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow transition-all duration-300"
            >
              Access Student Portal
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