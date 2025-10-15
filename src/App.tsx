import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

function AppContent() {
  const { user, loading } = useAuth();
  const { darkMode } = useDarkMode();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${darkMode ? 'from-gray-900 via-gray-800 to-gray-700' : 'from-emerald-50 via-teal-50 to-cyan-50'}`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 ${darkMode ? 'border-gray-500 border-t-transparent' : 'border-emerald-500 border-t-transparent'} rounded-full animate-spin mx-auto mb-4`} />
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Auth />;
}

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
