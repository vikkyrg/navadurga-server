const fs = require('fs');
const path = require('path');

const replaceInDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      replaceInDir(filePath);
    } else if (filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('http://localhost:5000')) {
        // Special case: already in a template string e.g. `http://localhost:5000${app.resumeUrl}`
        content = content.replace(/`http:\/\/localhost:5000(.*?)`/g, "`${import.meta.env.VITE_API_URL}$1`");
        // General cases for normal string quotes
        content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, "`${import.meta.env.VITE_API_URL}$1`");
        content = content.replace(/"http:\/\/localhost:5000(.*?)"/g, "`${import.meta.env.VITE_API_URL}$1`");
        fs.writeFileSync(filePath, content);
        console.log('Updated: ' + filePath);
      }
    }
  });
};

replaceInDir('c:/Users/rvikk/Desktop/navadurga/src');
replaceInDir('c:/Users/rvikk/Desktop/navadurga admin/src');
