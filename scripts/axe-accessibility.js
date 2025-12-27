// Automated accessibility test using axe-core and Puppeteer
const puppeteer = require('puppeteer');
const { readFileSync } = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Inject axe-core
  const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  await page.evaluate(axeSource);

  // Run axe accessibility checks
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: ['wcag2a', 'wcag2aa'],
      resultTypes: ['violations']
    });
  });

  if (results.violations.length > 0) {
    console.error('Accessibility violations found:');
    results.violations.forEach(v => {
      console.error(`- [${v.id}] ${v.help}: ${v.nodes.length} node(s)`);
    });
    process.exit(1);
  } else {
    console.log('No accessibility violations found.');
  }

  await browser.close();
})();
