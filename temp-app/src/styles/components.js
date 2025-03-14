import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container component (replaces wwe-container)
export const WWEContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  
  /* Make a less extreme clip-path to prevent content from being cut off */
  clip-path: polygon(0 0, 100% 0, 99% 100%, 1% 100%);
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

// Card component (replaces wwe-card)
export const WWECard = styled.div`
  background: linear-gradient(to bottom right, ${props => props.theme.colors.zinc800}, ${props => props.theme.colors.black});
  border: 2px solid ${props => props.theme.colors.gold};
  box-shadow: ${props => props.theme.shadows.wwe};
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 98% 100%, 2% 100%);
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  /* Make sure content has enough room */
  min-height: 150px;
  width: 100%;
  box-sizing: border-box;
`;

// Button component (replaces wwe-button)
export const WWEButton = styled.button`
  background-color: ${props => props.theme.colors.red};
  color: white;
  font-family: ${props => props.theme.fonts.impact};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  border: none;
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
  text-shadow: 1px 1px 0 #000000;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  
  &:hover {
    background-color: #c00000;
    transform: scale(1.05);
  }
`;

// NavLink component (replaces wwe-nav-link)
export const WWENavLink = styled(Link)`
  color: ${props => props.theme.colors.yellow};
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-shadow: 1px 1px 0 #000000;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
  
  ${props => props.active && `
    color: ${props.theme.colors.gold};
    transform: scale(1.1);
  `}
`;

// Table component (replaces wwe-table)
export const WWETable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    background-color: ${props => props.theme.colors.red};
    color: white;
    font-family: ${props => props.theme.fonts.impact};
    text-transform: uppercase;
    padding: 0.5rem;
    text-align: left;
  }
  
  td {
    border-bottom: 1px solid ${props => props.theme.colors.zinc700};
    padding: 0.5rem;
  }
  
  tr:hover {
    background-color: ${props => props.theme.colors.zinc800};
  }
`;

// FlexRow - common layout component
export const FlexRow = styled.div`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  gap: ${props => props.gap || '0'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileColumn ? 'column' : props.column ? 'column' : 'row'};
  }
`;

// Grid component
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: ${props => props.gap || '1rem'};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => props.tabletColumns || props.columns || 1}, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.mobileColumns || 1}, 1fr);
  }
`;

// Section titles
export const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.gold};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

// Badge component
export const WWEBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: ${props => props.color || 'white'};
  background-color: ${props => {
    if (props.variant === 'success') return props.theme.colors.green500;
    if (props.variant === 'error') return props.theme.colors.red500;
    return props.theme.colors.red;
  }};
  border-radius: 0.25rem;
`;

// Theme toggle button
export const WWEThemeToggle = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(to right, ${props => props.theme.colors.red}, ${props => props.theme.colors.black});
  border: 2px solid ${props => props.theme.colors.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.wwe};
  transition: all 0.3s;
  z-index: 100;
  animation: pulse 2s infinite;
  
  &:hover {
    transform: scale(1.1) rotate(6deg);
  }
  
  svg {
    height: 1.75rem;
    width: 1.75rem;
    color: ${props => props.theme.colors.yellow};
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
`; 