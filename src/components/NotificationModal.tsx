import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, Send, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  sender_name: string;
  is_read: boolean;
  created_at: string;
}

interface Profile {
  user_id: string;
  full_name: string;
  role: string;
}

const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingNotification, setSendingNotification] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    recipient_id: '',
    recipient_role: '',
    type: 'general'
  });
  const { profile } = useAuth();
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    if (open && profile) {
      fetchNotifications();
      fetchProfiles();
    }
  }, [open, profile]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          id,
          title,
          message,
          type,
          is_read,
          created_at,
          profiles!notifications_sender_id_fkey(full_name)
        `)
        .or(`recipient_id.eq.${profile?.user_id},recipient_role.eq.${profile?.role}`)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const formattedNotifications = data?.map((notif: any) => ({
        id: notif.id,
        title: notif.title,
        message: notif.message,
        type: notif.type,
        is_read: notif.is_read,
        created_at: notif.created_at,
        sender_name: notif.profiles?.full_name || 'System'
      })) || [];

      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, full_name, role')
        .neq('user_id', profile?.user_id);

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const sendNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSendingNotification(true);
      const { error } = await supabase
        .from('notifications')
        .insert({
          sender_id: profile?.user_id,
          recipient_id: newNotification.recipient_id || null,
          recipient_role: newNotification.recipient_role || null,
          title: newNotification.title,
          message: newNotification.message,
          type: newNotification.type
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notification sent successfully",
      });

      setNewNotification({
        title: '',
        message: '',
        recipient_id: '',
        recipient_role: '',
        type: 'general'
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send notification",
        variant: "destructive",
      });
    } finally {
      setSendingNotification(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'assignment': return 'default';
      case 'attendance': return 'secondary';
      case 'announcement': return 'destructive';
      default: return 'outline';
    }
  };

  const canSendNotifications = profile?.role === 'faculty' || profile?.role === 'admin';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications List */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Notifications</h3>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 border rounded-lg animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      !notification.is_read ? 'bg-primary/5 border-primary/20' : 'bg-background'
                    }`}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge variant={getTypeBadgeVariant(notification.type)} className="text-xs">
                            {notification.type}
                          </Badge>
                          {!notification.is_read && (
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>From: {notification.sender_name}</span>
                          <span>{new Date(notification.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>

          {/* Send Notification (Faculty/Admin Only) */}
          {canSendNotifications && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Notification
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Notification title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Notification message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={newNotification.type} 
                    onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <div className="space-y-2">
                    <Select 
                      value={newNotification.recipient_role} 
                      onValueChange={(value) => setNewNotification(prev => ({ 
                        ...prev, 
                        recipient_role: value, 
                        recipient_id: '' 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Send to all in role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Select role...</SelectItem>
                        <SelectItem value="student">All Students</SelectItem>
                        {profile?.role === 'admin' && <SelectItem value="faculty">All Faculty</SelectItem>}
                      </SelectContent>
                    </Select>
                    
                    <div className="text-center text-xs text-muted-foreground">or</div>
                    
                    <Select 
                      value={newNotification.recipient_id} 
                      onValueChange={(value) => setNewNotification(prev => ({ 
                        ...prev, 
                        recipient_id: value, 
                        recipient_role: '' 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Send to specific person" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Select person...</SelectItem>
                        {profiles.map((prof) => (
                          <SelectItem key={prof.user_id} value={prof.user_id}>
                            {prof.full_name} ({prof.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={sendNotification} 
                  disabled={sendingNotification}
                  className="w-full"
                >
                  {sendingNotification ? "Sending..." : "Send Notification"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;