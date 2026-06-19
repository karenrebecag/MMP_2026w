import type { Strings } from './strings';

export const en = {
  navbar: {
    cta: 'Join the waitlist',
  },
  hero: {
    tag: 'Conversion Intelligence for WhatsApp',
    titleBefore: 'Your chatbot replies, our AI',
    titleWords: ['sells', 'converts', 'closes', 'books'],
    titleAfter: 'from WhatsApp',
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
    replies: [
      'Sending you the plans now',
      "Awesome! Here's how it works",
      'Yes, spots open today',
      'Sure, quick rundown in a minute',
      'Yes, we ship nationwide',
      'Today: 30% launch discount',
      'Yes, we take all cards',
      "Perfect, here's your link",
    ],
  },
  whatAtom: {
    label: 'What atom does',
    titleL1: 'It chats, qualifies, and *closes.*',
    titleL2: 'All inside your *WhatsApp.*',
    lead: 'atom replies to every lead instantly, qualifies it, and books the sale. Your team just supervises and closes.',
  },
  features: {
    responde: {
      stat: '+89%',
      tag: 'Atom Transactional AI',
      title: 'Of qualified leads from WhatsApp, with no extra budget.',
      body: "Promote your salespeople to supervisors: Atom's transactional AI replies, converts, and sells, keeping the human touch where it matters. It removes your agents' manual, repetitive work.",
    },
    califica: {
      stat: '95%',
      tag: 'WhatsApp Remarketing',
      title: "Of leads aren't ready to buy yet.",
      body: "Keep them warm and convert them when they're ready with Atom's WhatsApp remarketing campaigns. Your ad spend, used to the fullest.",
    },
    cierra: {
      stat: '-30%',
      tag: 'Atom for Marketing',
      title: 'In customer acquisition cost.',
      body: 'Atom sends every closed sale to Meta and Google via Conversions API; your campaigns optimize toward leads that actually buy.',
    },
  },
  howItWorks: {
    eyebrow: 'How it works',
    lead: 'Your *AI* that',
    body: 'A single conversational AI that runs your WhatsApp end to end: it captures, qualifies, and closes while your team just supervises.',
    cta: 'Get started',
    features: [
      'Replies in seconds',
      'Qualifies every lead',
      'Converts conversations',
      'Logs it all in your CRM',
      'Calls over WhatsApp',
      'Launches campaigns',
      'Wins back cold leads',
      'Sells for you, 24/7',
    ],
  },
  logos: {
    eyebrow: 'Trusted by',
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
