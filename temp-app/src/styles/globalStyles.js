import { createGlobalStyle } from 'styled-components';

// WWE Attitude Era theme colors
export const WWETheme = {
  colors: {
    red: '#ff0000',
    black: '#000000',
    gold: '#ffd700',
    silver: '#c0c0c0',
    yellow: '#ffff00',
    zinc800: '#27272a',
    zinc900: '#18181b',
    zinc700: '#3f3f46',
    green500: '#22c55e',
    red500: '#ef4444',
  },
  shadows: {
    wwe: '0 4px 6px -1px rgba(255, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.5)',
  },
  fonts: {
    impact: "'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
  }
};

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.black};
    color: white;
    font-family: ${props => props.theme.fonts.impact};
    /* Note: background textures will be added when available */
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.impact};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.red};
    text-shadow: 2px 2px 0 #000000;
    margin-bottom: 1rem;
    
    @media (min-width: 768px) {
      font-size: 3rem;
    }
    
    @media (min-width: 1024px) {
      font-size: 3.5rem;
    }
  }

  h2 {
    font-size: 2rem;
    color: ${props => props.theme.colors.gold};
    text-shadow: 1px 1px 0 #000000;
    margin-bottom: 0.75rem;
    
    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  p {
    margin-bottom: 0.75rem;
  }

  a {
    color: ${props => props.theme.colors.yellow};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.gold};
      transition: color 0.3s ease;
    }
  }

  button {
    cursor: pointer;
  }

  /* Remove default margin */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle; 