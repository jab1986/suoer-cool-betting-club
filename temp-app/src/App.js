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
import AddFixture from './pages/AddFixture';
import Profile from './pages/Profile';
import PlayerProfile from './pages/PlayerProfile';

// Context
import { useTheme } from './context/ThemeContext';

// Styled Components
import { WWEThemeToggle } from './styles/components';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: 'white'
      }}>
        <Navbar />
        <main style={{ paddingTop: '80px', paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/fixtures" element={<FixtureManager />} />
            <Route path="/add-fixture" element={<AddFixture />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/player/:playerId" element={<PlayerProfile />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Theme Toggle Button - WWE Style */}
        <WWEThemeToggle 
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </WWEThemeToggle>
      </div>
    </Router>
  );
}

export default App;
