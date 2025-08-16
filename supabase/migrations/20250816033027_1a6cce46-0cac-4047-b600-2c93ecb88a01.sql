-- Create notifications table for admin/faculty/student communication
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(user_id) NOT NULL,
  recipient_id UUID REFERENCES public.profiles(user_id),
  recipient_role TEXT CHECK (recipient_role IN ('student', 'faculty', 'admin')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general' CHECK (type IN ('general', 'assignment', 'attendance', 'announcement')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(user_id) NOT NULL,
  course_id UUID REFERENCES public.courses(id) NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by UUID REFERENCES public.profiles(user_id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id, date)
);

-- Create enrollments table to track student-course relationships
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(user_id) NOT NULL,
  course_id UUID REFERENCES public.courses(id) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
  UNIQUE(student_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (
  recipient_id = auth.uid() OR 
  sender_id = auth.uid() OR
  (recipient_role IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role::text = recipient_role
  ))
);

CREATE POLICY "Faculty and admin can send notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')
  ) AND sender_id = auth.uid()
);

CREATE POLICY "Recipients can update read status" 
ON public.notifications 
FOR UPDATE 
USING (recipient_id = auth.uid() OR (
  recipient_role IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role::text = recipient_role
  )
));

-- Attendance policies
CREATE POLICY "Everyone can view attendance records" 
ON public.attendance_records 
FOR SELECT 
USING (true);

CREATE POLICY "Faculty and admin can create attendance records" 
ON public.attendance_records 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')
  ) AND marked_by = auth.uid()
);

CREATE POLICY "Faculty and admin can update attendance records" 
ON public.attendance_records 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')
  )
);

-- Enrollments policies
CREATE POLICY "Everyone can view enrollments" 
ON public.enrollments 
FOR SELECT 
USING (true);

CREATE POLICY "Faculty and admin can create enrollments" 
ON public.enrollments 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')
  )
);

CREATE POLICY "Faculty and admin can update enrollments" 
ON public.enrollments 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')
  )
);

-- Update triggers for timestamps
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update study groups policy to restrict creation to faculty and admin only
DROP POLICY IF EXISTS "Authenticated users can create study groups" ON public.study_groups;

CREATE POLICY "Faculty and admin can create study groups" 
ON public.study_groups 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')
  ) AND created_by = auth.uid()
);