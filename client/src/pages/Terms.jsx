import LegalPage from '../components/LegalPage.jsx';
import { site } from '../config/site.js';

const sections = [
  {
    heading: 'Use of this website',
    body: [
      `This website is operated by ${site.name} to present professional information and software development services. By using it, you agree to these terms.`,
    ],
  },
  {
    heading: 'No binding offer',
    body: [
      'Information on this site, including service descriptions and budget ranges, is general and does not form a contract. Any project work is governed by a separate written agreement covering scope, price, timeline and responsibilities.',
    ],
  },
  {
    heading: 'Portfolio projects',
    body: [
      'Projects marked as concepts or demonstrations illustrate skills and approach. They are not presented as completed client engagements.',
    ],
  },
  {
    heading: 'Healthcare-related services',
    body: [
      'Healthcare technology services describe areas of capability and interest. No website or application is represented as HIPAA-compliant without an appropriate assessment and safeguards agreed in writing.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'The content and design of this website belong to its owner unless otherwise stated. Ownership of work produced for clients is set out in each project agreement.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'This website is provided "as is." To the extent permitted by law, the owner is not liable for any loss arising from use of the site or reliance on its content.',
    ],
  },
  {
    heading: 'Contact',
    body: [`Questions about these terms can be sent to ${site.email}.`],
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      description="Terms for using the James Namata website and software development services."
      updated="Update this date before publishing"
      sections={sections}
    />
  );
}
