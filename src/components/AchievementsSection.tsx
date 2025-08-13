import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  Zap, 
  BookOpen, 
  Code, 
  Users, 
  TrendingUp,
  Medal,
  Crown,
  Award,
  Calendar,
  CheckCircle
} from "lucide-react";

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first coding challenge",
      icon: Target,
      category: "coding",
      earned: true,
      earnedDate: "2024-01-15",
      progress: 100,
      rarity: "common"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintain a 7-day coding streak",
      icon: Flame,
      category: "coding",
      earned: true,
      earnedDate: "2024-02-03",
      progress: 100,
      rarity: "uncommon"
    },
    {
      id: 3,
      title: "Academic Excellence",
      description: "Score 90+ in 5 assignments",
      icon: Star,
      category: "academic",
      earned: true,
      earnedDate: "2024-02-20",
      progress: 100,
      rarity: "rare"
    },
    {
      id: 4,
      title: "Python Master",
      description: "Complete the Python track",
      icon: Code,
      category: "coding",
      earned: false,
      progress: 85,
      rarity: "epic"
    },
    {
      id: 5,
      title: "Team Player",
      description: "Complete 10 collaborative coding sessions",
      icon: Users,
      category: "collaboration",
      earned: false,
      progress: 60,
      rarity: "rare"
    },
    {
      id: 6,
      title: "Speed Demon",
      description: "Solve 5 problems in under 10 minutes each",
      icon: Zap,
      category: "coding",
      earned: false,
      progress: 40,
      rarity: "legendary"
    }
  ];

  const streaks = [
    { type: "Coding", current: 7, best: 15, icon: Code },
    { type: "Academic", current: 3, best: 12, icon: BookOpen },
    { type: "Attendance", current: 5, best: 20, icon: Calendar }
  ];

  const stats = [
    { label: "Total Achievements", value: 23, icon: Trophy },
    { label: "Points Earned", value: 2847, icon: Star },
    { label: "Current Rank", value: "#42", icon: TrendingUp },
    { label: "Completion Rate", value: "78%", icon: Target }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-500 border-gray-500";
      case "uncommon": return "text-green-500 border-green-500";
      case "rare": return "text-blue-500 border-blue-500";
      case "epic": return "text-purple-500 border-purple-500";
      case "legendary": return "text-yellow-500 border-yellow-500";
      default: return "text-gray-500 border-gray-500";
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-500/10";
      case "uncommon": return "bg-green-500/10";
      case "rare": return "bg-blue-500/10";
      case "epic": return "bg-purple-500/10";
      case "legendary": return "bg-yellow-500/10";
      default: return "bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="h-8 w-8 text-warning" />
          Achievements & Progress
        </h2>
        <p className="text-muted-foreground">Track your milestones and celebrate your achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Current Streaks */}
      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-warning" />
          Current Streaks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {streaks.map((streak, index) => (
            <div key={index} className="text-center">
              <div className="p-4 bg-gradient-accent rounded-lg text-white mb-3">
                <streak.icon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{streak.current}</p>
                <p className="text-sm opacity-90">Current</p>
              </div>
              <p className="font-medium">{streak.type} Streak</p>
              <p className="text-sm text-muted-foreground">Best: {streak.best} days</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={achievement.id} 
                  className={`p-6 shadow-medium transition-all duration-300 ${
                    achievement.earned 
                      ? "hover:shadow-strong border-l-4 border-l-success" 
                      : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getRarityBg(achievement.rarity)}`}>
                      <Icon className={`h-6 w-6 ${achievement.earned ? 'text-success' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {achievement.earned && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize ${getRarityColor(achievement.rarity)}`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                  
                  {achievement.earned ? (
                    <div className="text-sm text-success">
                      ✓ Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="coding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements
              .filter(a => a.category === "coding")
              .map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.id} 
                    className={`p-6 shadow-medium transition-all duration-300 ${
                      achievement.earned 
                        ? "hover:shadow-strong border-l-4 border-l-success" 
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${getRarityBg(achievement.rarity)}`}>
                        <Icon className={`h-6 w-6 ${achievement.earned ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {achievement.earned && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${getRarityColor(achievement.rarity)}`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div className="text-sm text-success">
                        ✓ Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} />
                      </div>
                    )}
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements
              .filter(a => a.category === "academic")
              .map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.id} 
                    className={`p-6 shadow-medium transition-all duration-300 ${
                      achievement.earned 
                        ? "hover:shadow-strong border-l-4 border-l-success" 
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${getRarityBg(achievement.rarity)}`}>
                        <Icon className={`h-6 w-6 ${achievement.earned ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {achievement.earned && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${getRarityColor(achievement.rarity)}`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div className="text-sm text-success">
                        ✓ Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} />
                      </div>
                    )}
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="collaboration">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements
              .filter(a => a.category === "collaboration")
              .map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.id} 
                    className={`p-6 shadow-medium transition-all duration-300 ${
                      achievement.earned 
                        ? "hover:shadow-strong border-l-4 border-l-success" 
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${getRarityBg(achievement.rarity)}`}>
                        <Icon className={`h-6 w-6 ${achievement.earned ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {achievement.earned && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={`text-xs capitalize ${getRarityColor(achievement.rarity)}`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div className="text-sm text-success">
                        ✓ Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} />
                      </div>
                    )}
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Leaderboard Preview */}
      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5 text-warning" />
          Leaderboard
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gradient-hero rounded-lg text-white">
            <Medal className="h-6 w-6" />
            <div className="flex-1">
              <p className="font-semibold">Alex Chen</p>
              <p className="text-sm opacity-90">Computer Science</p>
            </div>
            <div className="text-right">
              <p className="font-bold">3,247 pts</p>
              <p className="text-sm opacity-90">#1</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="w-6 h-6 bg-silver rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div className="flex-1">
              <p className="font-semibold">Sarah Wilson</p>
              <p className="text-sm text-muted-foreground">Computer Science</p>
            </div>
            <div className="text-right">
              <p className="font-bold">2,891 pts</p>
              <p className="text-sm text-muted-foreground">#2</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
            <div className="w-6 h-6 bg-accent/60 rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div className="flex-1">
              <p className="font-semibold">John Doe (You)</p>
              <p className="text-sm text-muted-foreground">Computer Science</p>
            </div>
            <div className="text-right">
              <p className="font-bold">2,847 pts</p>
              <p className="text-sm text-muted-foreground">#42</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementsSection;