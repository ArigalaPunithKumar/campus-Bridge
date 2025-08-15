import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Shield, Settings, TrendingUp, AlertTriangle, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || 'Admin'}!</h2>
        <p className="text-white/80">Oversee the platform and manage users</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-2xl font-bold">47</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issues</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">User Management</h3>
              <p className="text-muted-foreground">Manage students and faculty</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Students</p>
                <p className="text-sm text-muted-foreground">1,089 active users</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Faculty</p>
                <p className="text-sm text-muted-foreground">147 active users</p>
              </div>
              <Badge variant="secondary">Verified</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Admins</p>
                <p className="text-sm text-muted-foreground">11 active users</p>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
          </div>
          
          <Button className="w-full mt-4">
            Manage Users
          </Button>
        </Card>

        {/* System Health */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-success/10 rounded-lg">
              <Shield className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">System Health</h3>
              <p className="text-muted-foreground">Platform status and monitoring</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-muted-foreground">All systems operational</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Online</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Authentication</p>
                <p className="text-sm text-muted-foreground">99.9% uptime</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Code Compiler</p>
                <p className="text-sm text-muted-foreground">Minor latency detected</p>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            View System Logs
          </Button>
        </Card>
      </div>

      {/* Recent Admin Activity */}
      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-semibold mb-4">Recent Admin Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Added 15 new students to CS department</p>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Settings className="h-4 w-4 text-warning" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Updated system security settings</p>
              <p className="text-sm text-muted-foreground">3 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-success/10 rounded-lg">
              <Bell className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Sent notification to all faculty members</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;