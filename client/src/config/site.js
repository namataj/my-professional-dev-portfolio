// ---------------------------------------------------------------------------
// Personal details and links. Edit this one file to update contact info
// across the whole site. Leave a value as '' to hide that link.
// ---------------------------------------------------------------------------
export const site = {
  name: 'James Namata',
  shortTitle: 'Software Engineer | Full-Stack Developer | Test Automation Engineer',
  fullTitle:
    'Software Engineer | Full-Stack Developer | Test Automation Engineer | Health Informatics Doctoral Student',
  // Shown in the hero indicator and used in copy across the site.
  yearsExperience: '10+',
  url: 'https://www.yourdomain.com',

  email: 'namatajames@gmail.com',
  phone: '+1 (240) 615-6427', 
  phoneHref: '+10000000000',
  whatsapp: '2406156427',
  location: 'Available for remote projects',

 //ithub: 'https://github.com/your-username', // placeholder
 //inkedin: 'https://www.linkedin.com/in/your-profile', // placeholder

  // Put your resume in client/public and point to it here.
 //esumeUrl: '/resume-placeholder.txt',
 //esumeIsPlaceholder: false,

  // Put your photo in client/src/assets and import it in Portrait.jsx.
  portraitSrc: '',
};

export const whatsappLink = (message = "Hi James, I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
