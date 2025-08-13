import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Play, Trophy, Target, Zap, Brain, Users, TrendingUp } from "lucide-react";

const CodingSection = () => {
  const codingTracks = [
    {
      title: "Python Mastery",
      level: "Advanced",
      progress: 85,
      problems: { solved: 127, total: 150 },
      streak: 7,
      color: "accent"
    },
    {
      title: "Data Structures & Algorithms",
      level: "Intermediate",
      progress: 60,
      problems: { solved: 45, total: 75 },
      streak: 3,
      color: "primary"
    },
    {
      title: "Web Development",
      level: "Beginner",
      progress: 30,
      problems: { solved: 12, total: 40 },
      streak: 2,
      color: "success"
    }
  ];

  const recentChallenges = [
    { title: "Binary Tree Traversal", difficulty: "Medium", completed: true, time: "15 min" },
    { title: "Two Sum Problem", difficulty: "Easy", completed: true, time: "8 min" },
    { title: "Longest Substring", difficulty: "Hard", completed: false, time: "In Progress" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Coding Arena</h2>
          <p className="text-muted-foreground">Enhance your programming skills with structured learning paths</p>
        </div>
        <div className="flex gap-3">
          <Button variant="coding">
            <Play className="h-4 w-4 mr-2" />
            Start Coding
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Join Room
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
              <p className="text-2xl font-bold">184</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Zap className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">7 days</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skill Rating</p>
              <p className="text-2xl font-bold">1,847</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rank</p>
              <p className="text-2xl font-bold">#42</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Coding Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {codingTracks.map((track, index) => (
          <Card key={index} className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{track.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {track.level}
                </Badge>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-warning">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">{track.streak}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{track.progress}%</span>
                </div>
                <Progress value={track.progress} />
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Problems Solved</span>
                <span>{track.problems.solved}/{track.problems.total}</span>
              </div>
            </div>
            
            <Button variant="coding" className="w-full mt-4">
              Continue Track
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Challenges */}
        <Card className="p-6 shadow-medium">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5" />
            Recent Challenges
          </h3>
          <div className="space-y-4">
            {recentChallenges.map((challenge, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  challenge.completed ? "bg-success/10" : "bg-warning/10"
                }`}>
                  {challenge.completed ? (
                    <Trophy className="h-4 w-4 text-success" />
                  ) : (
                    <Code className="h-4 w-4 text-warning" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{challenge.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        challenge.difficulty === "Easy" ? "border-success text-success" :
                        challenge.difficulty === "Medium" ? "border-warning text-warning" :
                        "border-destructive text-destructive"
                      }`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{challenge.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            View All Challenges
          </Button>
        </Card>

        {/* AI Assistant */}
        <Card className="p-6 shadow-medium">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Coding Assistant
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-accent rounded-lg text-white">
              <p className="font-medium mb-2">💡 Suggestion for you:</p>
              <p className="text-sm opacity-90">
                Based on your recent submissions, try practicing more dynamic programming problems to improve your algorithmic thinking.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Brain className="h-4 w-4 mr-2" />
                Get Code Review
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Debug My Code
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Practice Recommendations
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Collaborative Coding */}
      <Card className="p-6 shadow-medium">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Live Coding Rooms
            </h3>
            <p className="text-muted-foreground">Join collaborative coding sessions</p>
          </div>
          <Button variant="coding">
            Create Room
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:shadow-soft transition-all">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Binary Tree Problems</h4>
              <Badge variant="outline" className="text-success border-success">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">3/4 participants</p>
            <Button variant="outline" size="sm" className="w-full">Join Room</Button>
          </div>
          
          <div className="p-4 border rounded-lg hover:shadow-soft transition-all">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">React Practice Session</h4>
              <Badge variant="outline" className="text-warning border-warning">Waiting</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">1/4 participants</p>
            <Button variant="outline" size="sm" className="w-full">Join Room</Button>
          </div>
          
          <div className="p-4 border rounded-lg hover:shadow-soft transition-all">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Algorithm Design</h4>
              <Badge variant="outline" className="text-success border-success">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">2/4 participants</p>
            <Button variant="outline" size="sm" className="w-full">Join Room</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CodingSection;