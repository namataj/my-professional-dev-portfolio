import LegalPage from '../components/LegalPage.jsx';
import { site } from '../config/site.js';

const sections = [
  {
    heading: 'Information I collect',
    body: [
      'When you submit the quote request or contact form, I collect the details you provide: your name, email address, and optionally your phone number and organization, along with your project description, budget range and timeline.',
      'The server also records your IP address and browser user agent with each submission to help prevent spam and abuse.',
    ],
  },
  {
    heading: 'How I use it',
    body: [
      'I use your information only to respond to your inquiry, prepare proposals, and communicate about potential or ongoing projects. I do not sell, rent or share your information with third parties for marketing.',
    ],
  },
  {
    heading: 'Health information',
    body: [
      'These forms are not designed to receive protected health information (PHI). Please do not submit patient names, medical records, diagnoses or any other personal health details. If PHI is submitted by mistake, I will delete it.',
    ],
  },
  {
    heading: 'Storage and security',
    body: [
      'Submissions are stored in a secured database and sent to my email inbox. Access is limited to me. Reasonable technical measures are used to protect your data, but no method of transmission or storage is completely secure.',
    ],
  },
  {
    heading: 'Retention',
    body: ['Inquiries are kept for as long as needed to respond and maintain business records, and are then deleted.'],
  },
  {
    heading: 'Your choices',
    body: [`You can ask me to access, correct or delete your information at any time by emailing ${site.email}.`],
  },
  {
    heading: 'Changes',
    body: ['I may update this policy. The "last updated" date above shows when it was last changed.'],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      description="How James Namata collects, uses and protects information submitted through this website."
      updated="Update this date before publishing"
      sections={sections}
    />
  );
}
