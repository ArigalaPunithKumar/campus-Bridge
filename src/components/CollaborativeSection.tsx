import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Users, Plus, Video, MessageSquare, Calendar, Clock, UserPlus } from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  course_id: string;
  created_by: string;
  max_members: number;
  created_at: string;
  member_count?: number;
  is_member?: boolean;
  courses?: {
    title: string;
    course_code: string;
  };
}

const CollaborativeSection = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    course_id: '',
    max_members: 10
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchStudyGroups();
    fetchCourses();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select(`
          *,
          courses(title, course_code),
          study_group_members(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get member counts and check if user is a member
      const groupsWithDetails = await Promise.all(
        data.map(async (group) => {
          const { count: memberCount } = await supabase
            .from('study_group_members')
            .select('*', { count: 'exact' })
            .eq('group_id', group.id);

          const { data: memberData } = await supabase
            .from('study_group_members')
            .select('user_id')
            .eq('group_id', group.id)
            .eq('user_id', profile?.id);

          return {
            ...group,
            member_count: memberCount || 0,
            is_member: !!memberData?.length
          };
        })
      );

      setStudyGroups(groupsWithDetails);
    } catch (error) {
      console.error('Error fetching study groups:', error);
      toast({
        title: 'Error',
        description: 'Failed to load study groups',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title');

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const createStudyGroup = async () => {
    if (!profile || !newGroup.name.trim()) return;

    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert([{
          ...newGroup,
          created_by: profile.id
        }])
        .select()
        .single();

      if (error) throw error;

      // Automatically join the creator as a member
      await supabase
        .from('study_group_members')
        .insert([{
          group_id: data.id,
          user_id: profile.id
        }]);

      toast({
        title: 'Success',
        description: 'Study group created successfully!'
      });

      setNewGroup({ name: '', description: '', course_id: '', max_members: 10 });
      setIsCreateDialogOpen(false);
      fetchStudyGroups();
    } catch (error) {
      console.error('Error creating study group:', error);
      toast({
        title: 'Error',
        description: 'Failed to create study group',
        variant: 'destructive'
      });
    }
  };

  const joinStudyGroup = async (groupId: string) => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('study_group_members')
        .insert([{
          group_id: groupId,
          user_id: profile.id
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Joined study group successfully!'
      });

      fetchStudyGroups();
    } catch (error) {
      console.error('Error joining study group:', error);
      toast({
        title: 'Error',
        description: 'Failed to join study group',
        variant: 'destructive'
      });
    }
  };

  const leaveStudyGroup = async (groupId: string) => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', profile.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Left study group successfully!'
      });

      fetchStudyGroups();
    } catch (error) {
      console.error('Error leaving study group:', error);
      toast({
        title: 'Error',
        description: 'Failed to leave study group',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Collaborative Learning
          </h2>
          <p className="text-muted-foreground mt-2">
            Join study groups, collaborate on projects, and learn together
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Create Study Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Study Group</DialogTitle>
              <DialogDescription>
                Start a new study group and invite others to collaborate
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="group-name">Group Name</Label>
                <Input
                  id="group-name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <Label htmlFor="group-description">Description</Label>
                <Textarea
                  id="group-description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Describe the purpose of this study group"
                />
              </div>
              <div>
                <Label htmlFor="course-select">Course (Optional)</Label>
                <select
                  id="course-select"
                  value={newGroup.course_id}
                  onChange={(e) => setNewGroup({ ...newGroup, course_id: e.target.value })}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_code} - {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="max-members">Maximum Members</Label>
                <Input
                  id="max-members"
                  type="number"
                  min="2"
                  max="50"
                  value={newGroup.max_members}
                  onChange={(e) => setNewGroup({ ...newGroup, max_members: parseInt(e.target.value) })}
                />
              </div>
              <Button onClick={createStudyGroup} className="w-full">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-soft transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Start Video Call</h3>
            <p className="text-sm text-muted-foreground">Connect with your study group instantly</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-soft transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-secondary-foreground" />
            <h3 className="font-semibold mb-2">Group Chat</h3>
            <p className="text-sm text-muted-foreground">Discuss topics with your peers</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-soft transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-accent-foreground" />
            <h3 className="font-semibold mb-2">Schedule Session</h3>
            <p className="text-sm text-muted-foreground">Plan your study meetings</p>
          </CardContent>
        </Card>
      </div>

      {/* Study Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-soft transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  {group.courses && (
                    <Badge variant="secondary" className="mt-1">
                      {group.courses.course_code}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {group.member_count}/{group.max_members}
                </div>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Created {new Date(group.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex gap-2">
                {group.is_member ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => leaveStudyGroup(group.id)}
                    >
                      Leave
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => joinStudyGroup(group.id)}
                    disabled={group.member_count >= group.max_members}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Join Group
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {studyGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Study Groups Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create the first study group and start collaborating with your peers
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Study Group
          </Button>
        </div>
      )}
    </div>
  );
};

export default CollaborativeSection;