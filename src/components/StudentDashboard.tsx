import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Trophy, Calendar, Clock, Star, TrendingUp } from "lucide-react";
import academicIcon from "@/assets/academic-icon.jpg";
import codingIcon from "@/assets/coding-icon.jpg";

const StudentDashboard = () => {
  const handleStartCoding = () => {
    // This will be handled by the parent component
    const event = new CustomEvent('startCoding');
    window.dispatchEvent(event);
  };

  const handleViewCourses = () => {
    const event = new CustomEvent('viewCourses');
    window.dispatchEvent(event);
  };
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, Student!</h2>
        <p className="text-white/80">Continue your learning journey across academics and coding</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Academic Courses</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Code className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Coding Tracks</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Trophy className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Achievements</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Streak</p>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Section */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <img src={academicIcon} alt="Academic" className="w-12 h-12 rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">Academic Progress</h3>
              <p className="text-muted-foreground">Your courses and assignments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Data Structures</span>
                <Badge variant="outline">In Progress</Badge>
              </div>
              <Progress value={75} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Assignment due: Tomorrow</span>
                <span>75% complete</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Software Engineering</span>
                <Badge variant="secondary">Completed</Badge>
              </div>
              <Progress value={100} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Grade: A</span>
                <span>100% complete</span>
              </div>
            </div>
          </div>
          
          <Button variant="academic" className="w-full mt-4" onClick={handleViewCourses}>
            View All Courses
          </Button>
        </Card>

        {/* Coding Section */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <img src={codingIcon} alt="Coding" className="w-12 h-12 rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">Coding Progress</h3>
              <p className="text-muted-foreground">Your skill development tracks</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Python Mastery</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="text-sm">Advanced</span>
                </div>
              </div>
              <Progress value={85} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>15 problems solved this week</span>
                <span>85% complete</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Web Development</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="text-sm">Intermediate</span>
                </div>
              </div>
              <Progress value={60} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>React project in progress</span>
                <span>60% complete</span>
              </div>
            </div>
          </div>
          
          <Button variant="coding" className="w-full mt-4" onClick={handleStartCoding}>
            Start Coding Session
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-success/10 rounded-lg">
              <Trophy className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Completed "Binary Trees" challenge</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Submitted Database Systems assignment</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Joined collaborative coding session</p>
              <p className="text-sm text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;