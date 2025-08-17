import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BarChart3, Users, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  course_title: string;
  course_code: string;
}

interface AttendanceStats {
  month: string;
  present: number;
  absent: number;
  late: number;
}

const AttendanceSection = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
      fetchAttendanceData();
    }
  }, [profile]);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      
      // Fetch attendance records with course information
      const { data: records, error } = await supabase
        .from('attendance_records')
        .select(`
          id,
          date,
          status,
          courses!inner(title, course_code)
        `)
        .eq('student_id', profile?.id)
        .order('date', { ascending: false })
        .limit(50);

      if (error) throw error;

      const formattedRecords: AttendanceRecord[] = records?.map((record: any) => ({
        id: record.id,
        date: record.date,
        status: record.status,
        course_title: record.courses.title,
        course_code: record.courses.course_code
      })) || [];

      setAttendanceRecords(formattedRecords);

      // Calculate monthly stats for the chart
      const monthlyStats = calculateMonthlyStats(formattedRecords);
      setAttendanceStats(monthlyStats);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyStats = (records: AttendanceRecord[]): AttendanceStats[] => {
    const statsMap = new Map<string, { present: number; absent: number; late: number }>();
    
    records.forEach(record => {
      const month = new Date(record.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      
      if (!statsMap.has(month)) {
        statsMap.set(month, { present: 0, absent: 0, late: 0 });
      }
      
      const stats = statsMap.get(month)!;
      stats[record.status]++;
    });

    return Array.from(statsMap.entries())
      .map(([month, stats]) => ({ month, ...stats }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6); // Last 6 months
  };

  const getOverallStats = () => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const late = attendanceRecords.filter(r => r.status === 'late').length;
    
    return {
      total,
      present,
      absent,
      late,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0
    };
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'present': return 'default';
      case 'late': return 'secondary';
      case 'absent': return 'destructive';
      default: return 'outline';
    }
  };

  const stats = getOverallStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Attendance Overview</h2>
        <p className="text-white/80">Track your attendance across all courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Users className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-2xl font-bold">{stats.present}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Late</p>
              <p className="text-2xl font-bold">{stats.late}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-2xl font-bold">{stats.percentage}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Monthly Attendance</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="hsl(var(--success))" name="Present" />
                <Bar dataKey="late" fill="hsl(var(--warning))" name="Late" />
                <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Attendance */}
        <Card className="p-6 shadow-medium">
          <h3 className="text-xl font-semibold mb-6">Recent Attendance</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {attendanceRecords.slice(0, 10).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{record.course_title}</p>
                  <p className="text-sm text-muted-foreground">{record.course_code}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={getStatusBadgeVariant(record.status)}>
                  {record.status}
                </Badge>
              </div>
            ))}
            
            {attendanceRecords.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No attendance records found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceSection;