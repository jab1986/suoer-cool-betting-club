const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'src/pages',
  'src/components',
  'src/context',
  'src/styles'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Update package.json scripts
const packageJson = require('./package.json');
packageJson.scripts = {
  ...packageJson.scripts,
  "start": "react-scripts start",
  "build": "react-scripts build",
  "serve": "node server.js",
  "update": "node update.js"
};
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Create or update necessary files
const files = {
  'src/styles/theme.js': `
    export default {
      colors: {
        black: '#000000',
        red: '#ff0000',
        gold: '#ffd700',
        yellow: '#ffff00',
        green500: '#22c55e',
        red500: '#ef4444',
        zinc800: '#27272a',
        zinc900: '#18181b'
      },
      fonts: {
        impact: '"Impact", "Anton", system-ui'
      }
    };
  `,
  'src/styles/GlobalStyle.js': `
    import { createGlobalStyle } from 'styled-components';

    export default createGlobalStyle\`
      body {
        margin: 0;
        padding: 0;
        background: #121212;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
      }
    \`;
  `
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  fs.writeFileSync(fullPath, content.trim());
});

console.log('Update complete. Please restart the server.'); 