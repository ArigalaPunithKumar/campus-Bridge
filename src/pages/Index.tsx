import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StudentDashboard from "@/components/StudentDashboard";
import FacultyDashboard from "@/components/FacultyDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import AcademicSection from "@/components/AcademicSection";
import CodingSection from "@/components/CodingSection";
import CollaborativeSection from "@/components/CollaborativeSection";
import AchievementsSection from "@/components/AchievementsSection";
import AttendanceSection from "@/components/AttendanceSection";
import SettingsSection from "@/components/SettingsSection";
import ProfileDropdown from "@/components/ProfileDropdown";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [currentView, setCurrentView] = useState("hero");
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user && currentView !== "hero") {
        navigate("/auth");
      } else if (user && currentView === "hero") {
        setCurrentView("dashboard");
      }
    }
  }, [user, loading, currentView, navigate]);

  useEffect(() => {
    const handleStartCoding = () => {
      setActiveSection("coding");
      setCurrentView("dashboard");
    };

    const handleViewCourses = () => {
      setActiveSection("academic");
      setCurrentView("dashboard");
    };

    window.addEventListener('startCoding', handleStartCoding);
    window.addEventListener('viewCourses', handleViewCourses);

    return () => {
      window.removeEventListener('startCoding', handleStartCoding);
      window.removeEventListener('viewCourses', handleViewCourses);
    };
  }, []);

  const handleGetStarted = () => {
    if (user) {
      setCurrentView("dashboard");
    } else {
      navigate("/auth");
    }
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
        if (profile?.role === "faculty") return <FacultyDashboard />;
        if (profile?.role === "admin") return <AdminDashboard />;
        return <StudentDashboard />;
      case "academic":
        return <AcademicSection />;
      case "coding":
        return <CodingSection />;
      case "collaborative":
        return <CollaborativeSection />;
      case "achievements":
        return <AchievementsSection />;
      case "attendance":
        return <AttendanceSection />;
      case "settings":
        return <SettingsSection />;
      default:
        if (profile?.role === "faculty") return <FacultyDashboard />;
        if (profile?.role === "admin") return <AdminDashboard />;
        return <StudentDashboard />;
    }
  };

  if (currentView === "hero") {
    return (
      <div className="min-h-screen">
        <HeroSection />
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-4">
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-hero text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow transition-all duration-300 mr-4 animate-bounce-in"
              >
                Access Student Portal
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-medium"
              >
                Sign In / Sign Up
              </Button>
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
      <main className="flex-1 flex flex-col animate-fade-in">
        {/* Top Header */}
        <header className="flex items-center justify-end gap-4 p-4 border-b border-border bg-gradient-card backdrop-blur-sm">
          <ThemeToggle />
          <NotificationsDropdown />
          <ProfileDropdown onSettingsClick={() => setActiveSection("settings")} />
        </header>
        
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;