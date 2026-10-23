// Test automation frameworks, in display order. Used by the homepage card,
// the Services page card and the Test Automation page.
export const testFrameworks = [
  {
    id: 'selenium',
    name: 'Selenium WebDriver',
    languages: 'C# & Java',
    badge: 'Selenium (C# / Java)',
    icon: 'AppWindow',
    capabilities: [
      'Automated web application testing',
      'Functional and regression testing',
      'Page Object Model framework development',
      'Cross-browser testing',
      'Dynamic element validation',
      'Form, table, and chart validation',
    ],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    languages: 'JavaScript',
    badge: 'Playwright (JavaScript)',
    icon: 'Theater',
    capabilities: [
      'Modern browser automation',
      'End-to-end testing',
      'Cross-browser testing',
      'UI validation',
      'Automated regression testing',
      'API testing',
    ],
  },
  {
    id: 'robot-framework',
    name: 'Robot Framework',
    languages: 'Python',
    badge: 'Robot Framework (Python)',
    icon: 'Bot',
    capabilities: [
      'Keyword-driven test automation',
      'Web application testing',
      'Reusable test keywords',
      'Data-driven testing',
      'Test execution and reporting',
      'Integration with Python-based test libraries',
    ],
  },
  {
    id: 'accelq',
    name: 'ACCELQ',
    languages: 'Codeless',
    badge: 'ACCELQ',
    icon: 'Workflow',
    capabilities: [
      'Codeless test automation',
      'Automated functional testing',
      'Regression test automation',
      'API test automation',
      'Test design and execution',
      'Enterprise application testing',
    ],
  },
];

export const testAutomationDescription =
  'I help businesses deliver reliable, high-quality software through comprehensive functional testing, automated regression testing, API testing, and modern test automation frameworks. My approach focuses on improving software quality, reducing repetitive manual testing, and supporting faster, more dependable software releases.';

export const TEST_AUTOMATION_SLUG = 'qa-automation';
