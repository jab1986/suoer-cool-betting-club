import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import FixtureManager from './pages/FixtureManager';
import Profile from './pages/Profile';
import Stats from './pages/Stats';

// Context
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BettingProvider } from './context/BettingContext';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
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
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/fixtures" element={<FixtureManager />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/player/:playerName" element={<Profile />} />
      <Route path="/add-fixture" element={<FixtureManager />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BettingProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-wwe-black">
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <ThemeToggleButton />
          </div>
        </Router>
      </BettingProvider>
    </ThemeProvider>
  );
}

export default App;