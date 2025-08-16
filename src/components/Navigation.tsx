import { Button } from "@/components/ui/button";
import { GraduationCap, Code, Users, Settings, BookOpen, Trophy, ClipboardCheck, Home } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "coding", label: "Coding", icon: Code },
    { id: "collaborative", label: "Collaborate", icon: Users },
    { id: "attendance", label: "Attendance", icon: ClipboardCheck },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="bg-card border-r border-border shadow-soft p-4 min-h-screen w-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Mohan Babu University
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Academic + Coding Platform</p>
      </div>
      
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "academic" : "ghost"}
              onClick={() => onSectionChange(item.id)}
              className="w-full justify-start gap-3"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;