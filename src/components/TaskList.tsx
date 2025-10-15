import { Circle, Plus, Trash2, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { supabase, Task } from '../lib/supabase';

export default function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useDarkMode();

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

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setLoading(true);

    const xpValues = { easy: 5, medium: 10, hard: 20 };

    const { error } = await supabase.from('tasks').insert({
      user_id: user!.id,
      title: newTaskTitle.trim(),
      difficulty: newTaskDifficulty,
      xp_value: xpValues[newTaskDifficulty],
    });

    if (error) {
      console.error('Error adding task:', error);
    } else {
      setNewTaskTitle('');
      setNewTaskDifficulty('medium');
      fetchTasks();
    }

    setLoading(false);
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      fetchTasks();
    }
  };

  const getDifficultyColor = (difficulty: string, isSelected: boolean) => {
    if (darkMode) {
      if (isSelected) {
        switch (difficulty) {
          case 'easy':
            return 'bg-green-900/50 text-green-300 border-green-700';
          case 'hard':
            return 'bg-red-900/50 text-red-300 border-red-700';
          default:
            return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
        }
      } else {
        return 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600';
      }
    } else {
      if (isSelected) {
        switch (difficulty) {
          case 'easy':
            return 'bg-green-100 text-green-700 border-green-200';
          case 'hard':
            return 'bg-red-100 text-red-700 border-red-200';
          default:
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
      } else {
        return 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100';
      }
    }
  };

  const getTaskDifficultyColor = (difficulty: string) => {
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

  const getDifficultyXP = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '5 XP';
      case 'hard':
        return '20 XP';
      default:
        return '10 XP';
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addTask} className={`rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              New Task
            </label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What do you want to accomplish?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all ${
                darkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-800 placeholder-gray-400'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Difficulty
            </label>
            <div className="flex gap-3">
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setNewTaskDifficulty(diff)}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                    getDifficultyColor(diff, newTaskDifficulty === diff)
                  } ${newTaskDifficulty === diff ? 'shadow-sm' : ''}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="capitalize">{diff}</span>
                    <span className="text-xs opacity-80">{getDifficultyXP(diff)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !newTaskTitle.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className={`rounded-xl shadow-md p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Circle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <Circle className="w-6 h-6 text-gray-300 dark:text-gray-500 mt-0.5 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 break-words">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${getTaskDifficultyColor(
                        task.difficulty
                      )}`}
                    >
                      {task.difficulty}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      <Zap className={`w-3 h-3 ${
                        darkMode ? 'fill-emerald-400' : 'fill-emerald-700'
                      }`} />
                      {task.xp_value} XP
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}