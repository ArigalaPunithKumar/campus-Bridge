import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, Calendar, Users, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      fetchNotifications();
    }
  }, [profile]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .or(`recipient_id.eq.${profile?.user_id},recipient_role.eq.${profile?.role}`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load notifications',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
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

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4 text-primary" />;
      case "grade":
        return <Calendar className="h-4 w-4 text-success" />;
      case "announcement":
        return <MessageSquare className="h-4 w-4 text-warning" />;
      case "attendance":
        return <Users className="h-4 w-4 text-accent" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 px-0 hover:bg-accent/10 transition-all duration-300">
          <Bell className="h-4 w-4 animate-pulse-glow" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-bounce"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 shadow-strong" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between bg-gradient-primary text-white rounded-t-md p-4">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className="flex flex-col items-start p-4 cursor-pointer hover:bg-accent/5 transition-all duration-200"
                onClick={() => !notification.is_read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      {!notification.is_read && (
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(notification.created_at)}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center font-medium text-primary hover:bg-primary/5 transition-all duration-200">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;