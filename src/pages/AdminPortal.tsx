import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AdminDashboard from "@/components/AdminDashboard";
import AcademicSection from "@/components/AcademicSection";
import CodingSection from "@/components/CodingSection";
import CollaborativeSection from "@/components/CollaborativeSection";
import SettingsSection from "@/components/SettingsSection";
import ProfileDropdown from "@/components/ProfileDropdown";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

const AdminPortal = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth");
      } else if (profile?.role !== "admin") {
        navigate("/");
      }
    }
  }, [user, profile, loading, navigate]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "academic":
        return <AcademicSection />;
      case "coding":
        return <CodingSection />;
      case "collaborative":
        return <CollaborativeSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <AdminDashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
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
        <header className="flex items-center justify-between p-4 border-b border-border bg-gradient-card backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NotificationsDropdown />
            <ProfileDropdown onSettingsClick={() => setActiveSection("settings")} />
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;