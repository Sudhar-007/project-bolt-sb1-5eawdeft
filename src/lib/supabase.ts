import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  total_xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_completion_date: string | null;
  daily_goal: number;
  tasks_completed_today: number;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  xp_value: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  earned_at: string;
  metadata: Record<string, any>;
}
