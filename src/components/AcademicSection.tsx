import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, Users, Calendar, Clock, CheckCircle } from "lucide-react";

const AcademicSection = () => {
  const courses = [
    {
      title: "Data Structures & Algorithms",
      instructor: "Prof. Sarah Johnson",
      progress: 75,
      nextClass: "Tomorrow, 10:00 AM",
      assignments: 2,
      status: "active"
    },
    {
      title: "Software Engineering",
      instructor: "Dr. Mike Chen",
      progress: 100,
      nextClass: "Completed",
      assignments: 0,
      status: "completed"
    },
    {
      title: "Database Management Systems",
      instructor: "Prof. Emily Davis",
      progress: 45,
      nextClass: "Friday, 2:00 PM",
      assignments: 1,
      status: "active"
    }
  ];

  const upcomingAssignments = [
    {
      title: "Binary Search Tree Implementation",
      course: "Data Structures",
      dueDate: "Tomorrow",
      status: "pending"
    },
    {
      title: "Database Schema Design",
      course: "DBMS",
      dueDate: "Next Monday",
      status: "pending"
    },
    {
      title: "Code Review Report",
      course: "Software Engineering",
      dueDate: "Last Week",
      status: "overdue"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Academic Center</h2>
          <p className="text-muted-foreground">Manage your courses, assignments, and academic progress</p>
        </div>
        <Button variant="academic">
          <Calendar className="h-4 w-4 mr-2" />
          View Schedule
        </Button>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card key={index} className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-muted-foreground text-sm">{course.instructor}</p>
              </div>
              <Badge variant={course.status === "completed" ? "secondary" : "outline"}>
                {course.status === "completed" ? "Completed" : "Active"}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {course.nextClass}
              </div>
              
              {course.assignments > 0 && (
                <div className="flex items-center gap-2 text-sm text-warning">
                  <FileText className="h-4 w-4" />
                  {course.assignments} pending assignments
                </div>
              )}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View Course
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Assignments */}
        <Card className="p-6 shadow-medium">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upcoming Assignments
          </h3>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  assignment.status === "overdue" 
                    ? "bg-destructive/10" 
                    : assignment.status === "pending" 
                    ? "bg-warning/10" 
                    : "bg-success/10"
                }`}>
                  {assignment.status === "overdue" ? (
                    <Clock className={`h-4 w-4 text-destructive`} />
                  ) : assignment.status === "pending" ? (
                    <FileText className={`h-4 w-4 text-warning`} />
                  ) : (
                    <CheckCircle className={`h-4 w-4 text-success`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${
                    assignment.status === "overdue" ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {assignment.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Study Groups */}
        <Card className="p-6 shadow-medium">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Study Groups
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Data Structures Study Group</p>
                <p className="text-sm text-muted-foreground">5 members • Next: Today 7:00 PM</p>
              </div>
              <Button variant="outline" size="sm">Join</Button>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium">DBMS Project Team</p>
                <p className="text-sm text-muted-foreground">3 members • Active now</p>
              </div>
              <Button variant="outline" size="sm">Join</Button>
            </div>
          </div>
          
          <Button variant="academic" className="w-full mt-4">
            Create Study Group
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AcademicSection;