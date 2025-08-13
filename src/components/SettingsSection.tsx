import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Bell, Shield, Palette, Code, Globe } from "lucide-react";

const SettingsSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Settings
        </h2>
        <p className="text-muted-foreground">Customize your learning experience and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@university.edu" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" defaultValue="CSE2021001" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="cse">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full md:w-auto">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Academic Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="assignment-notifications">Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming assignments</p>
                    </div>
                    <Switch id="assignment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="grade-notifications">Grade Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when grades are posted</p>
                    </div>
                    <Switch id="grade-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="attendance-notifications">Attendance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get alerts for low attendance</p>
                    </div>
                    <Switch id="attendance-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Coding Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="challenge-notifications">Daily Challenges</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new coding challenges</p>
                    </div>
                    <Switch id="challenge-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="streak-notifications">Streak Reminders</Label>
                      <p className="text-sm text-muted-foreground">Remind me to maintain my coding streak</p>
                    </div>
                    <Switch id="streak-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="collab-notifications">Collaboration Invites</Label>
                      <p className="text-sm text-muted-foreground">Get notified when invited to coding rooms</p>
                    </div>
                    <Switch id="collab-notifications" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance & Display
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Coding Settings */}
        <TabsContent value="coding">
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code className="h-5 w-5" />
              Coding Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Default Programming Language</Label>
                <Select defaultValue="python">
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Editor Theme</Label>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="monokai">Monokai</SelectItem>
                    <SelectItem value="solarized">Solarized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-complete">Auto-complete</Label>
                    <p className="text-sm text-muted-foreground">Enable intelligent code completion</p>
                  </div>
                  <Switch id="auto-complete" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="syntax-highlight">Syntax Highlighting</Label>
                    <p className="text-sm text-muted-foreground">Highlight code syntax</p>
                  </div>
                  <Switch id="syntax-highlight" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="line-numbers">Line Numbers</Label>
                    <p className="text-sm text-muted-foreground">Show line numbers in editor</p>
                  </div>
                  <Switch id="line-numbers" defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other students</p>
                  </div>
                  <Switch id="profile-visibility" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="leaderboard-visibility">Leaderboard Participation</Label>
                    <p className="text-sm text-muted-foreground">Show your rank on coding leaderboards</p>
                  </div>
                  <Switch id="leaderboard-visibility" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform with usage data</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Account Security</h4>
                <Button variant="outline" className="w-full md:w-auto">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsSection;