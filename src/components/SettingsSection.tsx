import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Settings, User, Bell, Shield, Palette, Code, Globe, Save } from "lucide-react";

const SettingsSection = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    role: 'student' as 'student' | 'faculty' | 'admin'
  });
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        email: profile.email || '',
        role: profile.role || 'student'
      });
    }
  }, [profile]);

  const saveProfile = async () => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          email: profileData.email
        })
        .eq('user_id', profile.user_id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <Settings className="h-8 w-8" />
          Settings
        </h2>
        <p className="text-white/80">Customize your learning experience and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-muted shadow-soft">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">Appearance</TabsTrigger>
          <TabsTrigger value="coding" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">Coding</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="animate-scale-in">
          <Card className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={profileData.full_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="hover:border-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="hover:border-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  value={profileData.role}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
                <p className="text-sm text-muted-foreground">Role cannot be changed. Contact admin for role updates.</p>
              </div>
              
              <Button 
                onClick={saveProfile} 
                disabled={saving}
                className="w-full md:w-auto bg-gradient-hero hover:shadow-glow transition-all duration-300"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="animate-scale-in">
          <Card className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Notification Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Academic Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                    <div>
                      <Label htmlFor="assignment-notifications" className="font-medium">Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming assignments</p>
                    </div>
                    <Switch id="assignment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                    <div>
                      <Label htmlFor="grade-notifications" className="font-medium">Grade Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when grades are posted</p>
                    </div>
                    <Switch id="grade-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                    <div>
                      <Label htmlFor="attendance-notifications" className="font-medium">Attendance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get alerts for low attendance</p>
                    </div>
                    <Switch id="attendance-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              
              <div className="space-y-4">
                <h4 className="font-medium text-accent">Coding Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                    <div>
                      <Label htmlFor="challenge-notifications" className="font-medium">Daily Challenges</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new coding challenges</p>
                    </div>
                    <Switch id="challenge-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                    <div>
                      <Label htmlFor="streak-notifications" className="font-medium">Streak Reminders</Label>
                      <p className="text-sm text-muted-foreground">Remind me to maintain my coding streak</p>
                    </div>
                    <Switch id="streak-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                    <div>
                      <Label htmlFor="collab-notifications" className="font-medium">Collaboration Invites</Label>
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
        <TabsContent value="appearance" className="animate-scale-in">
          <Card className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Palette className="h-5 w-5 text-accent" />
              Appearance & Display
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="w-full md:w-64 hover:border-primary/50 transition-all duration-200">
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
                  <SelectTrigger className="w-full md:w-64 hover:border-primary/50 transition-all duration-200">
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
                  <SelectTrigger className="w-full md:w-64 hover:border-primary/50 transition-all duration-200">
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
        <TabsContent value="coding" className="animate-scale-in">
          <Card className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code className="h-5 w-5 text-success" />
              Coding Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Default Programming Language</Label>
                <Select defaultValue="python">
                  <SelectTrigger className="w-full md:w-64 hover:border-primary/50 transition-all duration-200">
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
                  <SelectTrigger className="w-full md:w-64 hover:border-primary/50 transition-all duration-200">
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
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div>
                    <Label htmlFor="auto-complete" className="font-medium">Auto-complete</Label>
                    <p className="text-sm text-muted-foreground">Enable intelligent code completion</p>
                  </div>
                  <Switch id="auto-complete" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div>
                    <Label htmlFor="syntax-highlight" className="font-medium">Syntax Highlighting</Label>
                    <p className="text-sm text-muted-foreground">Highlight code syntax</p>
                  </div>
                  <Switch id="syntax-highlight" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div>
                    <Label htmlFor="line-numbers" className="font-medium">Line Numbers</Label>
                    <p className="text-sm text-muted-foreground">Show line numbers in editor</p>
                  </div>
                  <Switch id="line-numbers" defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="animate-scale-in">
          <Card className="p-6 shadow-medium hover:shadow-strong transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-destructive" />
              Privacy & Security
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div>
                    <Label htmlFor="profile-visibility" className="font-medium">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other students</p>
                  </div>
                  <Switch id="profile-visibility" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div>
                    <Label htmlFor="leaderboard-visibility" className="font-medium">Leaderboard Participation</Label>
                    <p className="text-sm text-muted-foreground">Show your rank on coding leaderboards</p>
                  </div>
                  <Switch id="leaderboard-visibility" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200">
                  <div>
                    <Label htmlFor="analytics" className="font-medium">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform with usage data</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>
              
              <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
              
              <div className="space-y-4">
                <h4 className="font-medium text-destructive">Account Security</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="w-full sm:w-auto hover:bg-primary/5 hover:border-primary transition-all duration-300">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto hover:bg-accent/5 hover:border-accent transition-all duration-300">
                    Enable Two-Factor Authentication
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsSection;