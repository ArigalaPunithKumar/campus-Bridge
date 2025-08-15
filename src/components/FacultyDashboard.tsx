import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, FileText, Calendar, Clock, TrendingUp, UserCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const FacultyDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-secondary rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || 'Faculty'}!</h2>
        <p className="text-white/80">Manage your courses and guide students to success</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <FileText className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Grade</p>
              <p className="text-2xl font-bold">B+</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Management */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Course Management</h3>
              <p className="text-muted-foreground">Manage your courses and assignments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Data Structures & Algorithms</p>
                <p className="text-sm text-muted-foreground">CS 301 • 35 students</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Software Engineering</p>
                <p className="text-sm text-muted-foreground">CS 402 • 28 students</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
          </div>
          
          <Button className="w-full mt-4">
            Manage Courses
          </Button>
        </Card>

        {/* Assignment Reviews */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-warning/10 rounded-lg">
              <FileText className="h-8 w-8 text-warning" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Assignment Reviews</h3>
              <p className="text-muted-foreground">Pending submissions to grade</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Binary Search Implementation</p>
                <p className="text-sm text-muted-foreground">12 submissions pending</p>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Database Design Project</p>
                <p className="text-sm text-muted-foreground">8 submissions pending</p>
              </div>
              <Badge variant="outline">Review</Badge>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            Review Assignments
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-success/10 rounded-lg">
              <FileText className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Graded 15 assignments for CS 301</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Posted new assignment: "Tree Traversal"</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-accent/10 rounded-lg">
              <UserCheck className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Updated attendance for CS 402</p>
              <p className="text-sm text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FacultyDashboard;