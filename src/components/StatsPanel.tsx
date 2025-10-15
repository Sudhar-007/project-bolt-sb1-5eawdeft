import { Award, Flame, Target, TrendingUp, Trophy, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function StatsPanel() {
  const { profile } = useAuth();
  const { darkMode } = useDarkMode();

  if (!profile) return null;

  const xpToNextLevel = ((profile.level) * 100) - profile.total_xp;
  const xpProgress = (profile.total_xp % 100);
  const progressPercentage = (xpProgress / 100) * 100;

  const dailyGoalProgress = Math.min(
    (profile.tasks_completed_today / profile.daily_goal) * 100,
    100
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-emerald-100 text-sm mb-1">Welcome back,</p>
            <h2 className="text-2xl font-bold">{profile.display_name || 'Learner'}</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Trophy className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {profile.level}</span>
            <span className="text-sm">{xpProgress} / 100 XP</span>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-emerald-100 mt-2">
            {xpToNextLevel} XP to next level
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`rounded-xl shadow-md p-5 border-2 ${darkMode ? 'bg-gray-800 border-orange-600' : 'bg-white border-orange-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-900/50' : 'bg-orange-100'}`}>
              <Flame className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{profile.current_streak}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-md p-5 border-2 ${darkMode ? 'bg-gray-800 border-teal-600' : 'bg-white border-teal-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-teal-900/50' : 'bg-teal-100'}`}>
              <Award className={`w-5 h-5 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{profile.longest_streak}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Streak</p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-md p-5 border-2 ${darkMode ? 'bg-gray-800 border-emerald-600' : 'bg-white border-emerald-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
              <Zap className={`w-5 h-5 ${darkMode ? 'text-emerald-400 fill-emerald-400' : 'text-emerald-600 fill-emerald-500'}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{profile.total_xp}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-md p-5 border-2 ${darkMode ? 'bg-gray-800 border-cyan-600' : 'bg-white border-cyan-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-cyan-900/50' : 'bg-cyan-100'}`}>
              <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{profile.level}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Level</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-teal-900/50' : 'bg-teal-100'}`}>
            <Target className={`w-6 h-6 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Daily Goal</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {profile.tasks_completed_today} / {profile.daily_goal} tasks completed
            </p>
          </div>
        </div>

        <div className={`rounded-full h-4 overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-md"
            style={{ width: `${dailyGoalProgress}%` }}
          />
        </div>

        {profile.tasks_completed_today >= profile.daily_goal && (
          <div className={`mt-4 rounded-lg p-3 text-center border ${darkMode ? 'bg-emerald-900/30 border-emerald-700' : 'bg-emerald-50 border-emerald-200'}`}>
            <p className={`font-semibold flex items-center justify-center gap-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              <Trophy className="w-5 h-5" />
              Daily goal complete!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}