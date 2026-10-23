// ---------------------------------------------------------------------------
// Portfolio projects. To add or update a project, edit this list.
//
// status:   'concept' | 'demo' | 'complete'   (shown as a badge)
// github:   repository URL, or '' to hide the button
// demo:     live demo URL,  or '' to hide the button
// image:    import a screenshot from src/assets and set it here, or leave ''
//           to show the built-in illustrated preview
//
// All projects below are demonstration concepts. Swap in real links and
// screenshots as each one is built — do not mark a project 'complete' until
// it is.
// ---------------------------------------------------------------------------
export const projectCategories = [
  'All',
  'React Websites',
  'Full-Stack Applications',
  'Backend APIs',
  'Test Automation',
  'Healthcare Technology',
];

export const projects = [
  {
    id: 'business-website',
    name: 'Business Website',
    category: 'React Websites',
    status: 'concept',
    preview: 'site',
    description: 'A responsive multi-page business website built with React and Tailwind CSS.',
    details:
      'A template-quality business site with service pages, a gallery, and a working contact form. Designed mobile-first, with semantic markup and SEO fundamentals in place.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'React Router'],
    features: ['Responsive layouts', 'Service and gallery pages', 'Contact form', 'SEO metadata'],
    github: '',
    demo: '',
    image: '',
  },
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    category: 'Full-Stack Applications',
    status: 'concept',
    preview: 'store',
    description: 'An online store with product listings, a shopping cart, and checkout integration.',
    details:
      'Product catalog with categories and search, a persistent cart, and a checkout flow designed to hand off to a payment provider. Includes an admin view for order management.',
    tech: ['React', 'Node.js', 'Express', 'MySQL'],
    features: ['Product catalog and categories', 'Shopping cart', 'Checkout integration', 'Order management'],
    github: '',
    demo: '',
    image: '',
  },
  {
    id: 'user-management',
    name: 'Full-Stack User Management System',
    category: 'Full-Stack Applications',
    status: 'concept',
    preview: 'table',
    description: 'A React, Node.js, Express, and MySQL application supporting full CRUD operations.',
    details:
      'Create, read, update, and delete users through a REST API with server-side validation, parameterized queries, and a clean controller–service–model structure.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'REST API'],
    features: ['CRUD operations', 'Server-side validation', 'Search and filtering', 'Layered backend architecture'],
    github: '',
    demo: '',
    image: '',
  },
  {
    id: 'selenium-framework',
    name: 'Selenium Automation Framework',
    category: 'Test Automation',
    status: 'concept',
    preview: 'tests',
    description: 'A C# Selenium framework for automated testing of forms, tables, charts, and UI elements.',
    details:
      'A page-object based framework with reusable helpers for form validation, table data checks, and chart verification, plus readable test reports.',
    tech: ['C#', 'Selenium WebDriver', 'NUnit', 'Page Object Model'],
    features: ['Form validation tests', 'Table and chart validation', 'Reusable page objects', 'Test reporting'],
    github: '',
    demo: '',
    image: '',
  },
  {
    id: 'appointment-booking',
    name: 'Appointment Booking Application',
    category: 'Backend APIs',
    status: 'concept',
    preview: 'calendar',
    description: 'An application for scheduling appointments and managing service requests.',
    details:
      'Customers pick an available time slot; staff manage bookings and service requests from a dashboard. Backed by a REST API that prevents double-booking.',
    tech: ['React', 'Node.js', 'Express', 'MySQL'],
    features: ['Availability calendar', 'Booking management', 'Service request tracking', 'Conflict checks'],
    github: '',
    demo: '',
    image: '',
  },
  {
    id: 'healthcare-dashboard',
    name: 'Healthcare Operations Dashboard',
    category: 'Healthcare Technology',
    status: 'concept',
    preview: 'chart',
    description:
      'A demonstration dashboard for visualizing healthcare operational metrics using synthetic sample data.',
    details:
      'Visualizes operational measures such as appointment volume, wait times, and staffing using entirely synthetic data. No real patient information is used.',
    tech: ['React', 'Data visualization', 'Node.js', 'MySQL'],
    features: ['Operational metric charts', 'Synthetic sample data only', 'Filterable views', 'Responsive layout'],
    github: '',
    demo: '',
    image: '',
  },
];
