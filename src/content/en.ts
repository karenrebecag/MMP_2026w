// English copy. Structure mirrors es.ts exactly; only text changes.
// **…** marks words to emphasize (typographic weight) to reinforce the narrative.

import type { SectionContent } from './types';
import { WAITLIST, CTA_BG_VIDEO, PROBLEMA_IMG, VISION_IMG } from './shared';

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
    theme: 'dark',
    eyebrow: 'The thesis',
    heading: 'WhatsApp Marketing isn’t about sending messages. It’s about designing conversations that sell.',
    rotate: {
      before: 'WhatsApp Marketing isn’t about sending messages. It’s about designing conversations that',
      words: ['sell', 'convert', 'close', 'build loyalty', 'scale'],
      after: '.',
    },
    paragraphs: [
      'In this program you’ll learn how to think of WhatsApp as a strategic channel within the sales funnel. From the first click on a campaign to lead qualification, follow-up, recovering inactive opportunities and truly measuring results.',
      'Because every conversation can be a sale. But only if it’s designed to move forward.',
    ],
  },
  {
    kind: 'checklist',
    id: 'aa-problema',
    theme: 'dark',
    eyebrow: 'The problem',
    heading: 'From lost lead to converted opportunity',
    media: {
      side: 'left',
      src: PROBLEMA_IMG,
      alt: '',
      chat: [
        { kind: 'in', text: 'Hi, I’m interested 🙌', time: '18:40' },
        { kind: 'in', text: 'Can you send me the price?', time: '18:41' },
        { kind: 'in', text: 'Hello? Are you still there?', time: '19:55' },
        { kind: 'in', text: 'Still waiting 😐', time: '20:48' },
        { kind: 'in', text: 'Fine, I’ll look elsewhere', time: '21:30' },
        { kind: 'in', text: 'Thanks anyway 👋', time: '21:31' },
      ],
    },
    intro: [
      'Most companies invest in generating demand, but lose opportunities once the lead reaches WhatsApp.',
    ],
    marker: 'dot',
    items: [
      'Slow replies.',
      'Messages without context.',
      'Overwhelmed agents.',
      'Lack of follow-up.',
      'Data that never makes it back to campaigns.',
      'Interested leads that never reach sales.',
    ],
    outro: [
      'WhatsApp Marketing exists to solve that problem.',
      'It’s not about generating more conversations. It’s about converting the conversations you’re already generating better.',
    ],
  },
  {
    kind: 'prose',
    id: 'aa-vision',
    theme: 'dark',
    eyebrow: 'The vision',
    heading: 'The new role companies are going to need',
    surface: { color: '#25d366', text: 'dark' },
    media: {
      side: 'right',
      src: VISION_IMG,
      alt: '',
      chat: [
        { kind: 'in', text: 'Hi, I saw your ad 👀', time: '12:01' },
        { kind: 'out', text: 'Hi! 👋 Want me to explain how it works?', time: '12:01' },
        { kind: 'in', text: 'Yes, please', time: '12:02' },
        { kind: 'out', text: 'We connect your ad → WhatsApp → close', time: '12:02' },
        { kind: 'in', text: 'What if I don’t reply in time?', time: '12:03' },
        { kind: 'out', text: 'The AI replies instantly and notifies you ⚡', time: '12:03' },
        { kind: 'in', text: 'I’m interested 🔥 price?', time: '12:05' },
        { kind: 'out', text: 'Today with launch spots: 30% off', time: '12:05' },
        { kind: 'in', text: 'I want it 🙌', time: '12:06' },
        { kind: 'out', text: 'Here’s the link to book 📅', time: '12:06' },
        { kind: 'in', text: 'Booked! ✅', time: '12:08' },
      ],
    },
    paragraphs: [
      'Companies already have ad specialists. CRM specialists. Automation specialists. Sales specialists.',
      'But between the click and the sale there’s a critical zone: the conversation. That’s where the WhatsApp Marketer role is born.',
      'Someone able to understand the strategy, design the experience, optimize the messages, read the data and turn WhatsApp into a growth channel.',
      'It’s not just about replying faster. It’s about selling better.',
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
    kind: 'cards',
    id: 'aa-programa',
    theme: 'dark',
    eyebrow: 'Program',
    heading: 'What you’ll learn',
    layout: 'slider',
    cards: [
      {
        variant: 'dark',
        tag: 'Basics',
        title: 'Fundamentals',
        desc: 'Why WhatsApp is today one of the key marketing and sales channels in LATAM.',
      },
      {
        variant: 'electric',
        tag: 'Strategy',
        title: 'Conversational strategy',
        desc: 'Journeys, flows and messages that take the lead from interest to purchase.',
      },
      {
        variant: 'purple',
        tag: 'Acquisition',
        title: 'Click to WhatsApp',
        desc: 'Campaigns that take users straight to WhatsApp without losing leads after the first message.',
      },
      {
        variant: 'neutral',
        tag: 'AI',
        title: 'Automation and AI',
        desc: 'AI to reply, qualify, schedule and recover leads without losing personalization.',
      },
      {
        variant: 'dark',
        tag: 'Data',
        title: 'Traceability and data',
        desc: 'Measure what happens inside WhatsApp and connect it to your CRM to optimize campaigns.',
      },
      {
        variant: 'electric',
        tag: 'Conversion',
        title: 'Sales optimization',
        desc: 'Improve response times, prioritize leads and recover inactive opportunities.',
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
