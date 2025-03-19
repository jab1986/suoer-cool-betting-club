import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { ThemeProvider } from 'styled-components';
import { BettingProvider } from './context/BettingContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Stats from './pages/Stats';
import Fixtures from './pages/Fixtures';
import Profile from './pages/Profile';
import PlayerProfile from './pages/PlayerProfile';
import AddFixture from './pages/AddFixture';

// Context
import { useTheme } from './context/ThemeContext';

// Styled Components
import { WWEThemeToggle } from './styles/components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  const { theme: contextTheme, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BettingProvider>
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
                <Route path="/stats" element={<Stats />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/add-fixture" element={<AddFixture />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/player/:playerName" element={<PlayerProfile />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Theme Toggle Button - WWE Style */}
            <WWEThemeToggle 
              onClick={toggleTheme}
              aria-label={contextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {contextTheme === 'dark' ? (
                <Sun />
              ) : (
                <Moon />
              )}
            </WWEThemeToggle>
          </div>
        </Router>
      </BettingProvider>
    </ThemeProvider>
  );
}

export default App;
