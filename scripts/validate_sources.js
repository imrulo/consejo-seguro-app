// Script: validate_sources.js
// Valida que todas las URLs en archivos JSON y Markdown sean de dominios oficiales .gov.rs u officialgazette.rs
const fs = require('fs');
const path = require('path');

const OFFICIAL_DOMAINS = [/\.gov\.rs$/, /officialgazette\.rs$/];
const DATA_DIRS = ['data', 'docs'];
const URL_REGEX = /https?:\/\/[\w\.-]+/g;

function isOfficial(url) {
  return OFFICIAL_DOMAINS.some((re) => re.test(url));
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const urls = content.match(URL_REGEX) || [];
  return urls.filter((url) => !isOfficial(url)).map((url) => ({ file: filePath, url }));
}

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.json') || file.endsWith('.md')) {
      results = results.concat(scanFile(fullPath));
    }
  });
  return results;
}

function main() {
  let allViolations = [];
  DATA_DIRS.forEach((dir) => {
    if (fs.existsSync(dir)) {
      allViolations = allViolations.concat(walk(dir));
    }
  });
  if (allViolations.length === 0) {
    console.log('✅ Todas las fuentes externas son oficiales.');
  } else {
    console.log('❌ Fuentes NO oficiales encontradas:');
    allViolations.forEach(({ file, url }) => {
      console.log(`Archivo: ${file} | URL: ${url}`);
    });
    process.exit(1);
  }
}

if (require.main === module) main();
