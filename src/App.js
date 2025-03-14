import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import FixtureManager from './pages/FixtureManager';
import Profile from './pages/Profile';

// Context
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-wwe-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/fixtures" element={<FixtureManager />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Theme Toggle Button - WWE Style */}
        <button 
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-wwe-red to-wwe-black border-2 border-wwe-gold w-14 h-14 rounded-full flex items-center justify-center shadow-wwe transition-all duration-300 transform hover:scale-110 hover:rotate-6 animate-pulse"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-7 w-7 text-wwe-yellow" />
          ) : (
            <Moon className="h-7 w-7 text-wwe-yellow" />
          )}
        </button>
      </div>
    </Router>
  );
}

export default App; 