import type { Strings } from './strings';

export const en = {
  navbar: {
    cta: 'Join the waitlist',
  },
  hero: {
    tag: 'Conversion Intelligence for WhatsApp',
    titleBefore: 'Your chatbot replies, our AI',
    titleWords: ['sells', 'converts', 'closes', 'books'],
    subtitle:
      'Promote your salespeople to **supervisors of the AI** that qualifies leads, closes sales, and cuts acquisition costs **by up to 30%**.',
    ctaPrimary: 'Book a demo',
    ctaSecondary: 'Watch demo',
    messages: [
      'How much is it?',
      "I'm interested",
      'Is it available?',
      'Tell me more',
      'Do you ship?',
      'Any promo?',
      'Do you take cards?',
      'I want to buy',
    ],
  },
  heroClassic: {
    title: 'Become a WhatsApp Marketing Expert',
    subtitle:
      'The first training to master the channel where opportunities are now generated, qualified, and closed.',
    ctaLabel: 'Join the waitlist',
    footnote: '* First edition in July · priority access for the waitlist.',
  },
  waitlist: {
    eyebrow: 'Waitlist · July launch',
    heading: 'Join the waitlist',
    lead: "In this first edition, access will be exclusive to those who register. Leave your details and we'll notify you before the general launch.",
    fields: {
      name: { label: 'Name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'yourname@email.com' },
      company: { label: 'Company', placeholder: 'Company you work for' },
      role: { label: 'Role', placeholder: 'Your role or title' },
      phone: { label: 'Phone', placeholder: '+1 555 123 4567' },
    },
    privacy: {
      before: 'I agree to receive information about the course and the ',
      link: 'privacy policy',
      after: '.',
    },
    submit: 'Join the waitlist',
    validation: {
      name: 'Enter your name.',
      email: 'Enter a valid email.',
      company: 'Enter your company.',
      role: 'Enter your role.',
      phone: 'Enter a valid phone number.',
      form: 'Please check the highlighted fields.',
    },
    status: {
      loading: 'Sending…',
      success: "Done! We'll notify you before the launch.",
      error: 'Could not send. Please try again in a moment.',
    },
  },
} satisfies Strings;
