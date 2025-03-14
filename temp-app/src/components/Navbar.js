import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Trophy, Calendar, User, Home, Plus } from 'lucide-react';
import styled from 'styled-components';
import { WWENavLink, FlexRow } from '../styles/components';

const NavContainer = styled.nav`
  background: linear-gradient(to right, ${props => props.theme.colors.black}, ${props => props.theme.colors.red});
  border-bottom: 4px solid ${props => props.theme.colors.gold};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 1.875rem;
  color: ${props => props.theme.colors.yellow};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: ${props => props.theme.fonts.impact};
  
  span {
    color: white;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  color: white;
  background: none;
  border: none;
  display: none;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  background-color: ${props => props.theme.colors.black};
  border-top: 2px solid ${props => props.theme.colors.gold};
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0 1rem;
`;

const MobileNavLink = styled(WWENavLink)`
  padding: 0.75rem;
  
  &:hover {
    background-color: rgba(255, 0, 0, 0.2);
  }
  
  ${props => props.active && `
    background-color: rgba(255, 0, 0, 0.2);
  `}
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
    { name: 'Fixtures', path: '/fixtures', icon: <Calendar size={20} /> },
    { name: 'Add Fixture', path: '/add-fixture', icon: <Plus size={20} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavContainer>
        <NavInner>
          {/* Logo */}
          <WWENavLink to="/">
            <Logo>
              Super Cool <span>Betting</span> Club
            </Logo>
          </WWENavLink>

          {/* Desktop Navigation */}
          <NavLinks>
            {navLinks.map((link) => (
              <WWENavLink 
                key={link.path} 
                to={link.path}
                active={location.pathname === link.path}
              >
                {link.icon}
                <span style={{ marginLeft: '4px' }}>{link.name}</span>
              </WWENavLink>
            ))}
          </NavLinks>

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </MobileMenuButton>
        </NavInner>
      </NavContainer>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <MobileMenu>
          <MobileNavLinks>
            {navLinks.map((link) => (
              <MobileNavLink 
                key={link.path} 
                to={link.path}
                active={location.pathname === link.path}
                onClick={toggleMenu}
              >
                <FlexRow gap="0.5rem">
                  {link.icon}
                  <span>{link.name}</span>
                </FlexRow>
              </MobileNavLink>
            ))}
          </MobileNavLinks>
        </MobileMenu>
      )}
    </>
  );
};

export default Navbar; 