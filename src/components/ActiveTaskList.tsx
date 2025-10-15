import { CheckCircle2, Circle, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { supabase, Task } from '../lib/supabase';

export default function ActiveTaskList() {
  const { user, refreshProfile } = useAuth();
  const { darkMode } = useDarkMode();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completingTask, setCompletingTask] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user!.id)
      .eq('completed', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    setTasks(data || []);
  };

  const completeTask = async (task: Task) => {
    setCompletingTask(task.id);

    const { error } = await supabase
      .from('tasks')
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', task.id);

    if (error) {
      console.error('Error completing task:', error);
      setCompletingTask(null);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user!.id)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({
          total_xp: profile.total_xp + task.xp_value,
          level: Math.floor((profile.total_xp + task.xp_value) / 100) + 1,
          tasks_completed_today: profile.tasks_completed_today + 1,
        })
        .eq('id', user!.id);
    }

    await refreshProfile();
    await fetchTasks();
    setCompletingTask(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    if (darkMode) {
      switch (difficulty) {
        case 'easy':
          return 'bg-green-900/50 text-green-300 border-green-700';
        case 'hard':
          return 'bg-red-900/50 text-red-300 border-red-700';
        default:
          return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      }
    } else {
      switch (difficulty) {
        case 'easy':
          return 'bg-green-100 text-green-700 border-green-200';
        case 'hard':
          return 'bg-red-100 text-red-700 border-red-200';
        default:
          return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      }
    }
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className={`rounded-xl shadow-md p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Circle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            No active tasks. Add some tasks to get started!
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => completeTask(task)}
            disabled={completingTask === task.id}
            className={`w-full rounded-xl shadow-md p-5 transition-all border text-left ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:border-emerald-600' 
                : 'bg-white border-gray-100 hover:shadow-lg hover:border-emerald-200'
            } ${completingTask === task.id ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {completingTask === task.id ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-pulse" />
                ) : (
                  <Circle className={`w-6 h-6 transition-colors ${
                    darkMode ? 'text-gray-500 group-hover:text-emerald-400' : 'text-gray-300 group-hover:text-emerald-500'
                  }`} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-medium break-words ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(task.difficulty)}`}>
                    {task.difficulty}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    <Zap className={`w-3 h-3 ${
                      darkMode ? 'fill-emerald-400' : 'fill-emerald-700'
                    }`} />
                    +{task.xp_value} XP
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
}