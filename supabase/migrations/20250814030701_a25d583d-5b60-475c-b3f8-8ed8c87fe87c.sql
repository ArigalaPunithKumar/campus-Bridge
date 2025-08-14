-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('student', 'faculty', 'admin');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course_code TEXT NOT NULL UNIQUE,
  faculty_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignments table
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  due_date TIMESTAMP WITH TIME ZONE,
  total_points INTEGER DEFAULT 100,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignment submissions table
CREATE TABLE public.assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id),
  content TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  grade INTEGER,
  graded_at TIMESTAMP WITH TIME ZONE,
  graded_by UUID REFERENCES public.profiles(id),
  feedback TEXT,
  UNIQUE(assignment_id, student_id)
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id),
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('present', 'absent', 'late')) NOT NULL,
  marked_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(course_id, student_id, date)
);

-- Create study groups table
CREATE TABLE public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES public.courses(id),
  created_by UUID REFERENCES public.profiles(id),
  max_members INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study group members table
CREATE TABLE public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create coding sessions table
CREATE TABLE public.coding_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for courses
CREATE POLICY "Everyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Faculty and admin can create courses" ON public.courses FOR INSERT 
WITH CHECK (EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')));
CREATE POLICY "Faculty can update their courses, admin can update all" ON public.courses FOR UPDATE
USING (EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR (role = 'faculty' AND id = faculty_id))));

-- Create RLS policies for assignments
CREATE POLICY "Everyone can view assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Faculty and admin can create assignments" ON public.assignments FOR INSERT
WITH CHECK (EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')));
CREATE POLICY "Faculty can update their assignments, admin can update all" ON public.assignments FOR UPDATE
USING (EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (role = 'admin' OR (role = 'faculty' AND id = created_by))));

-- Create RLS policies for assignment submissions
CREATE POLICY "Students can view their submissions, faculty can view all" ON public.assignment_submissions FOR SELECT
USING (auth.uid() = student_id OR EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')));
CREATE POLICY "Students can insert their submissions" ON public.assignment_submissions FOR INSERT
WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update their ungraded submissions, faculty can update all" ON public.assignment_submissions FOR UPDATE
USING (auth.uid() = student_id AND grade IS NULL OR EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')));

-- Create RLS policies for attendance
CREATE POLICY "Everyone can view attendance" ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Faculty and admin can insert attendance" ON public.attendance FOR INSERT
WITH CHECK (EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')));
CREATE POLICY "Faculty and admin can update attendance" ON public.attendance FOR UPDATE
USING (EXISTS(SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('faculty', 'admin')));

-- Create RLS policies for study groups
CREATE POLICY "Everyone can view study groups" ON public.study_groups FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create study groups" ON public.study_groups FOR INSERT
WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Creator can update study group" ON public.study_groups FOR UPDATE
USING (auth.uid() = created_by);

-- Create RLS policies for study group members
CREATE POLICY "Everyone can view study group members" ON public.study_group_members FOR SELECT USING (true);
CREATE POLICY "Users can join study groups" ON public.study_group_members FOR INSERT
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave their study groups" ON public.study_group_members FOR DELETE
USING (auth.uid() = user_id);

-- Create RLS policies for coding sessions
CREATE POLICY "Users can view their coding sessions" ON public.coding_sessions FOR SELECT
USING (auth.uid() = user_id);
CREATE POLICY "Users can create coding sessions" ON public.coding_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their coding sessions" ON public.coding_sessions FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
    BEFORE UPDATE ON public.assignments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_groups_updated_at
    BEFORE UPDATE ON public.study_groups
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coding_sessions_updated_at
    BEFORE UPDATE ON public.coding_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();