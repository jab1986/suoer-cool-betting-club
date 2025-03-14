import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, Calendar, User, Home } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Fixtures', path: '/fixtures', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-wwe-black to-wwe-red border-b-4 border-wwe-gold shadow-lg">
      <div className="wwe-container flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-impact text-wwe-yellow tracking-wider uppercase">
            Super Cool <span className="text-white">Betting</span> Club
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`wwe-nav-link flex items-center space-x-1 ${
                location.pathname === link.path ? 'text-wwe-gold scale-110' : ''
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white hover:text-wwe-gold"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-wwe-black border-t-2 border-wwe-gold">
          <div className="px-2 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`wwe-nav-link flex items-center space-x-2 p-3 ${
                  location.pathname === link.path ? 'bg-wwe-red/20 text-wwe-gold' : ''
                }`}
                onClick={toggleMenu}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 