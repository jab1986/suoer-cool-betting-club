import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/stats', label: 'Player Stats' },
    { path: '/fixtures', label: 'Fixtures' },
    { path: '/admin', label: 'Admin' }
  ];

  return (
    <nav className="bg-metal-gray border-b-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-title text-primary tracking-wider">
              <span className="text-secondary">SUPER COOL</span> BETTING CLUB
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-title uppercase text-lg px-2 py-1 border-b-2 ${
                  location.pathname === item.path
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:border-secondary hover:text-secondary'
                } transition-colors duration-300`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-none bg-dark hover:bg-primary transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-secondary" />
              ) : (
                <Moon className="h-5 w-5 text-secondary" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-title uppercase text-lg px-2 py-1 ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'hover:text-secondary'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Theme Toggle for Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center text-lg px-2 py-1 font-title uppercase"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-5 w-5 mr-2 text-secondary" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2 text-secondary" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 