// English copy. Structure mirrors es.ts exactly; only text changes.
// **…** marks words to emphasize (typographic weight) to reinforce the narrative.

import type { SectionContent } from './types';
import { WAITLIST, CTA_BG_VIDEO, ENGINE_IMG } from './shared';

export const en: SectionContent[] = [
  {
    kind: 'manifesto',
    theme: 'light',
    eyebrow: 'The shift',
    heading: 'Why become a WhatsApp Marketer?',
    paragraphs: [
      'Because marketing changed. First the challenge was generating traffic. Then it was generating leads. Today, the real challenge is **converting conversations**.',
      'Users no longer want to fill out forms and wait. They want to **write, get an instant reply** and move forward on WhatsApp.',
      'But for that to work, “having WhatsApp” isn’t enough. **You need strategy.**',
      'A **WhatsApp Marketer** knows how to turn that channel into a **growth machine**: connecting ads, messages, automation, AI, CRM, data and sales into an experience that **actually converts**.',
    ],
    bubbles: [
      { kind: 'in', text: 'Does this work if I sell through DMs?', time: '11:58' },
      { kind: 'out', text: 'How much does it cost?', time: '11:59' },
      { kind: 'in', text: 'Do I need to know tech?', time: '11:59' },
      { kind: 'in', text: 'How soon will I see results?', time: '12:00' },
      { kind: 'out', text: 'Will it work for my store?', time: '12:00' },
      { kind: 'in', text: 'What if I don’t know marketing?', time: '12:01' },
      { kind: 'in', text: 'Is there a certificate?', time: '12:01' },
      { kind: 'out', text: 'Is it useful for agencies?', time: '12:02' },
      { kind: 'in', text: 'Does it include templates?', time: '12:02' },
      { kind: 'in', text: 'Are there still spots left?', time: '12:03' },
    ],
  },
  {
    kind: 'statement',
    id: 'aa-tesis',
    theme: 'light',
    eyebrow: 'The thesis',
    heading: 'Everything you need to run WhatsApp as a sales channel',
    paragraphs: [],
  },
  {
    kind: 'cards',
    id: 'aa-programa',
    theme: 'light',
    heading: '',
    layout: 'slider',
    cards: [
      {
        variant: 'mint',
        title: 'Transactional AI on WhatsApp',
        desc: 'An AI that runs your WhatsApp conversations end to end, so your reps only step in when needed.',
      },
      {
        variant: 'lavender',
        title: 'Smart remarketing',
        desc: 'With follow-up messages and calls, Atom recovers leads that don’t buy on first contact and keeps them engaged until they’re ready to move forward.',
      },
      {
        variant: 'peach',
        title: 'Service with experts',
        desc: 'Our team of experts in your industry guides you through implementing AI in your operation and trains you to reach autonomy.',
      },
      {
        variant: 'sky',
        title: 'From ad click to sale, fully visible',
        desc: 'The only system that converts, recovers and traces every lead, from Meta, Google or TikTok to the close in your CRM.',
      },
      {
        variant: 'mint',
        title: 'More conversions, lower cost',
        desc: 'With Conversions API integration, increase qualified leads and cut your ad costs by up to 30%.',
      },
    ],
  },
  {
    kind: 'tabs',
    id: 'aa-vision',
    theme: 'light',
    eyebrow: 'Atom’s AI engine',
    heading: 'An *AI engine* built to speed up your processes',
    tabs: [
      {
        label: 'Conversation summary',
        heading: 'Conversation summary',
        paragraphs: [
          'While other bots just store the chat history, Atom’s AI reads every conversation and hands you a clear summary: what the lead wants, what stage they’re in, and the next step.',
          'Your team picks up any chat in seconds — no scrolling through hundreds of messages, no lost context.',
        ],
        image: { src: ENGINE_IMG.summary, alt: 'Sales rep reviewing a conversation summary' },
      },
      {
        label: 'Smart suggestions',
        heading: 'Smart suggestions',
        paragraphs: [
          'Atom goes beyond canned replies: it suggests the ideal next message based on the real context of the conversation and your sales strategy.',
          'Your reps respond better and faster, with an expert’s consistency in every chat.',
        ],
        image: { src: ENGINE_IMG.suggestions, alt: 'Professional getting smart AI suggestions' },
      },
      {
        label: 'Conversation prioritization',
        heading: 'Conversation prioritization',
        paragraphs: [
          'Instead of an endless first-come inbox, Atom’s AI detects buying intent and surfaces hot leads first.',
          'Your team spends its time on the conversations that actually close deals.',
        ],
        image: { src: ENGINE_IMG.priority, alt: 'Team prioritizing the most important conversations' },
      },
      {
        label: 'WhatsApp calls with AI',
        heading: 'WhatsApp calls with AI',
        paragraphs: [
          'Atom goes beyond text: it makes and assists WhatsApp calls with AI to answer questions, book meetings, and close without friction.',
          'A voice layer no traditional chatbot offers, built into the same channel.',
        ],
        image: { src: ENGINE_IMG.calls, alt: 'Professional on an AI-assisted WhatsApp call' },
      },
    ],
  },
  {
    kind: 'info',
    theme: 'light',
    scribble: 'What do they do?',
    heading:
      'A WhatsApp Marketing Expert turns conversations into growth: designs the experience, optimizes the messages and connects every chat to the sales strategy.',
    rotate: {
      before: 'A WhatsApp Marketing Expert turns conversations into growth:',
      words: [
        'designs the experience',
        'optimizes the messages',
        'connects every chat to the sales strategy',
      ],
      block: true,
    },
    items: [
      {
        title: 'Designs the conversation',
        desc: 'Builds conversational journeys and messages that qualify, educate and convert, taking the lead from the first click to the sale without friction.',
      },
      {
        title: 'Optimizes acquisition',
        desc: 'Launches and fine-tunes Click to WhatsApp campaigns so every ad ends in a real conversation, without losing leads along the way.',
      },
      {
        title: 'Integrates data and AI',
        desc: 'Connects WhatsApp with the CRM, automation and AI to measure real conversion and recover leads that stopped replying.',
      },
      {
        title: 'Aligns marketing and sales',
        desc: 'Gets both teams working on the same channel, with more context and better results.',
      },
    ],
  },
  {
    kind: 'audience',
    id: 'aa-audience',
    theme: 'light',
    eyebrow: 'Who it’s for',
    heading: 'This program is for you if…',
    intro:
      'WhatsApp Marketing is for those who live between marketing and sales, and want to convert every conversation better.',
    items: [
      'You work in marketing, sales, growth, performance, CRM, lifecycle, customer experience or revenue.',
      'You manage campaigns that bring leads to WhatsApp.',
      'You want to reduce the loss of opportunities after the click.',
      'You need to improve conversion across lead, conversation and sale.',
      'You’re looking to integrate WhatsApp with AI, automation, CRM and data.',
      'You want to develop a skill that’s increasingly important for modern sales teams.',
    ],
  },
  {
    kind: 'reviews',
    id: 'aa-reviews',
    theme: 'light',
    eyebrow: 'Reviews',
    heading: 'Real sales teams. Measurable results.',
    subheading: 'What teams already running WhatsApp on Atom are saying.',
    reviews: [
      {
        quote: 'We’ve managed to automate our entire WhatsApp sales process.',
        name: 'Reyna P.',
        role: 'Operations Manager',
        rating: 5,
      },
      {
        quote: 'Atom gives us a strong, professional competitive edge.',
        name: 'Carlos M.',
        role: 'Customer Service Head',
        rating: 5,
      },
      {
        quote: 'How easy it is to segment customers by why they reach out.',
        name: 'Hamit A.',
        role: 'Logistics & Transport',
        rating: 5,
      },
      {
        quote: 'The Facebook and WhatsApp integration was easily my top feature.',
        name: 'Frederick G.',
        role: 'Exec Director',
        rating: 4,
      },
      {
        quote: 'It’s intuitive and feels very productive from day one.',
        name: 'Laura S.',
        role: 'Benefits Manager',
        rating: 4,
      },
      {
        quote: 'All the functionality you need, wrapped in a clean UI.',
        name: 'Sean D.',
        role: 'Marketing Assistant',
        rating: 5,
      },
      {
        quote: 'How smooth it is to use, with a really friendly interface.',
        name: 'Nteziyaremye I.',
        role: 'Information Technology',
        rating: 4,
      },
      {
        quote: 'We were impressed with its features and performance.',
        name: 'Chris C.',
        role: 'IT Managing Director',
        rating: 4,
      },
    ],
  },
  {
    kind: 'prose',
    id: 'aa-generacion',
    theme: 'light',
    eyebrow: 'First cohort · July 2026',
    heading: 'Be part of the first cohort of WhatsApp Marketing Experts',
    paragraphs: [
      'The first edition launches in July with priority access for the waitlist. Sign up, explore the full program and secure your spot before the general opening.',
    ],
    faq: [
      { q: 'When does the program launch?', a: 'The program launches in July.' },
      {
        q: 'Who gets access first?',
        a: 'In this first edition, access will be prioritized for people registered on the waitlist.',
      },
      {
        q: 'Do I need previous experience with WhatsApp Business?',
        a: 'Not necessarily. The program is designed for marketing, sales, growth, CRM, performance and customer experience professionals who want to learn to use WhatsApp as a strategic conversion channel.',
      },
      {
        q: 'Is the program only for technical teams?',
        a: 'No. It’s designed for business profiles who need to understand strategy, automation, AI, data and conversion without relying exclusively on technical knowledge.',
      },
      {
        q: 'What will I achieve by the end?',
        a: 'You’ll understand how to design, implement and optimize WhatsApp Marketing strategies to capture, qualify, recover and convert leads more efficiently.',
      },
    ],
    cta: { label: 'I want to join the waitlist', href: WAITLIST },
  },
  {
    kind: 'cta',
    theme: 'dark',
    heading: 'The future of marketing doesn’t end at the click. It starts in the conversation.',
    paragraphs: [
      'Join the waitlist and be part of the first program to become a WhatsApp Marketing Expert.',
    ],
    cta: { label: 'Join the waitlist', href: WAITLIST },
    bgVideo: CTA_BG_VIDEO,
  },
];
