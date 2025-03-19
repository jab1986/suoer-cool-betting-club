const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting production build process...');

// Run the React build script
try {
  console.log('Building React application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('React build completed successfully.');
} catch (error) {
  console.error('Error building React application:', error);
  process.exit(1);
}

// Ensure the build directory exists
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  console.error('Build directory not found. Build may have failed.');
  process.exit(1);
}

console.log('Production build completed successfully!');
console.log('You can now run "npm run serve" to start the production server.');

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