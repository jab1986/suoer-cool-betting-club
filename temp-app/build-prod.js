const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting production build process...');

// Run npm install
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run build
console.log('Building application...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');

// Create a server.js file to serve the build
const serverFilePath = path.join(__dirname, 'server.js');
const serverContent = `
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Always return the main index.html for any request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`;

fs.writeFileSync(serverFilePath, serverContent);
console.log('Server file created!');

// Create a new package.json for production
const packagePath = path.join(__dirname, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Add express as a dependency if not already present
if (!packageData.dependencies.express) {
  console.log('Adding express dependency...');
  packageData.dependencies.express = '^4.18.2';
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  execSync('npm install express', { stdio: 'inherit' });
}

console.log('Production build process completed!'); 