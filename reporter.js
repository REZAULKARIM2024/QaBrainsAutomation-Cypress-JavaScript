// ============================================================
// reporter.js
// Reads all Cucumber JSON files from cypress/reports/cucumber-json/
// and generates a rich HTML report in cypress/reports/html/
//
// Run after tests:
//   node reporter.js
//   or:  npm run report
// ============================================================

const report = require('multiple-cucumber-html-reporter');
const path   = require('path');
const fs     = require('fs');

const JSON_DIR  = path.join(__dirname, 'cypress/reports/cucumber-json');
const HTML_DIR  = path.join(__dirname, 'cypress/reports/html');

// Create output directory if it doesn't exist
if (!fs.existsSync(HTML_DIR)) {
  fs.mkdirSync(HTML_DIR, { recursive: true });
}

// Check that JSON reports actually exist
if (!fs.existsSync(JSON_DIR) || fs.readdirSync(JSON_DIR).filter(f => f.endsWith('.json')).length === 0) {
  console.error('\n❌  No JSON report files found in', JSON_DIR);
  console.error('    Run "npm test" first to generate them.\n');
  process.exit(1);
}

report.generate({
  jsonDir:    JSON_DIR,
  reportPath: HTML_DIR,

  // ── Project metadata shown in the report header ─────────────
  metadata: {
    browser: {
      name:    'Electron (Cypress)',
      version: '118',
    },
    device:   'Local Machine',
    platform: {
      name:    'macOS',
      version: '',
    },
  },

  // ── Report customisation ─────────────────────────────────────
  reportName:          'QaBrains Cypress BDD Test Report',
  pageTitle:           'QaBrains Automation Report',
  displayDuration:     true,
  displayReportTime:   true,
  openReportInBrowser: false,

  // Show a summary of passed / failed / skipped on the overview page
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project',     value: 'QaBrains Cypress BDD' },
      { label: 'Environment', value: 'https://practice.qabrains.com' },
      { label: 'Execution',   value: new Date().toLocaleString() },
    ],
  },
});

console.log('\n✅  HTML report generated at:', path.join(HTML_DIR, 'index.html'), '\n');
