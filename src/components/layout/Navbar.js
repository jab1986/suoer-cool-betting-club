import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Trophy, Calendar, User, Home, Plus, BarChart2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
    { name: 'Stats', path: '/stats', icon: <BarChart2 size={20} /> },
    { name: 'Fixtures', path: '/fixtures', icon: <Calendar size={20} /> },
    { name: 'Add Fixture', path: '/add-fixture', icon: <Plus size={20} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-wwe-black to-wwe-red border-b-4 border-wwe-gold shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-wwe-yellow text-3xl uppercase tracking-wider font-bold hover:text-white transition duration-300">
            Super Cool <span className="text-white">Betting</span> Club
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center text-white hover:text-wwe-gold transition duration-300 ${location.pathname === link.path ? 'text-wwe-gold' : ''}`}
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="md:hidden text-white hover:text-wwe-gold"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-wwe-black border-t-2 border-wwe-gold p-2">
          <div className="flex flex-col gap-3 py-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center p-3 text-white hover:bg-wwe-red/20 transition duration-300 ${location.pathname === link.path ? 'bg-wwe-red/20' : ''}`}
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
