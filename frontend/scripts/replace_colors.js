const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

// These files generally sit on transparent background and need all their dark text inverted
const filesToFullyInvert = [
  'pages/LandingPage.jsx',
  'pages/ServiceDetail.jsx',
  'components/FieldsWeWorkUnder.jsx',
  'components/FeaturesSection.jsx',
  'components/TechSection.jsx',
];

// For these files we have to be careful about not replacing text-gray-900 if it's inside bg-white
const filesToPartiallyInvert = [
  'components/ProductGrid.jsx',   // Has bg-gray-50 cards
  'components/ContactForm.jsx',  // Has bg-white form
  'components/Footer.jsx',       // Just replace #0A111A ?
  'components/Navbar.jsx',       // Navbar is white/90
];

function processFile(filePath, isSafe) {
  const fullPath = path.join(srcDir, filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  if (isSafe) {
    // Blanket replacements
    content = content.replace(/text-gray-900/g, 'text-white');
    content = content.replace(/text-\[\#0A111A\]/g, 'text-white');
    content = content.replace(/text-gray-800/g, 'text-gray-100');
    content = content.replace(/text-gray-700/g, 'text-gray-200');
    content = content.replace(/text-gray-600/g, 'text-gray-300');
    content = content.replace(/text-gray-500/g, 'text-gray-300');
  } else {
    // Specifically target only those outside of white backgrounds. 
    // This is hard to regex, so we'll do custom replacements based on manually checked patterns
    console.log(`Skipping partial file for automated script: ${filePath}`);
    return;
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Processed: ${filePath}`);
}

filesToFullyInvert.forEach(f => processFile(f, true));
