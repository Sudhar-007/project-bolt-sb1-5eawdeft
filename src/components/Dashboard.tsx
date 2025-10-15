import { Home, ListTodo, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import ActiveTaskList from './ActiveTaskList';
import StatsPanel from './StatsPanel';
import TaskList from './TaskList';

export default function Dashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'manage'>('home');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${darkMode ? 'from-gray-900 via-gray-800 to-gray-700' : 'from-emerald-50 via-teal-50 to-cyan-50'}`}>
      <nav className={darkMode ? "bg-gray-900 shadow-md border-b border-gray-800" : "bg-white shadow-md border-b border-gray-200"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>TaskQuest</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${darkMode ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
              <button
                onClick={handleSignOut}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${darkMode ? 'text-gray-100' : ''}`}>
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'home'
                ? darkMode
                  ? 'bg-gray-800 text-emerald-400 shadow-md border-2 border-emerald-600'
                  : 'bg-white text-emerald-600 shadow-md border-2 border-emerald-200'
                : darkMode
                ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:shadow-md'
                : 'bg-white/50 text-gray-600 hover:bg-white hover:shadow-md'
            }`}
          >
            <Home className="w-5 h-5" />
            Active Tasks
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'manage'
                ? darkMode
                  ? 'bg-gray-800 text-emerald-400 shadow-md border-2 border-emerald-600'
                  : 'bg-white text-emerald-600 shadow-md border-2 border-emerald-200'
                : darkMode
                ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:shadow-md'
                : 'bg-white/50 text-gray-600 hover:bg-white hover:shadow-md'
            }`}
          >
            <ListTodo className="w-5 h-5" />
            Manage Tasks
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'home' ? (
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Complete tasks to earn XP
                </h2>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Click on a task to mark it complete and level up!
                </p>
                <ActiveTaskList />
              </div>
            ) : (
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Manage Your Tasks
                </h2>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Add new tasks and organize your quest list.
                </p>
                <TaskList />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <StatsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}