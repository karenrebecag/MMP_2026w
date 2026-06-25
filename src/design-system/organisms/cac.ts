// Sección CAC: bloque split — texto + CTA a la izquierda, marquee infinito de badges
// (partners/reviews) a la derecha. Las badges vivían en el footer y se movieron aquí.

import { renderContainer, renderSection } from '../molecules/layout';
import { renderHeading, renderParagraph, renderEyebrow } from '../atoms/text';
import { renderButton } from '../atoms/button';
import { strings } from '../../core/i18n';
import { UPLOADS, PARTNERS } from '../../core/config/brand';

interface Badge {
  src: string;
  alt: string;
  href: string;
  w: number;
  h: number;
}

const BADGES: Badge[] = [
  {
    src: `${UPLOADS}/2023/08/MBP-Badge-Dark-backgrounds@1x.png`,
    alt: 'Meta Business Partner',
    href: PARTNERS.meta,
    w: 388,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/High-Performer-Latin-America-Winter-2025-1.png`,
    alt: 'G2 High Performer Latin America',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/High-Performer-Small-Business_32025.png`,
    alt: 'G2 High Performer Small Business',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/High-Performer-Mid-Market_25.png`,
    alt: 'G2 High Performer Mid-Market',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/Momentum-Leader-sp-2025.png`,
    alt: 'G2 Momentum Leader',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/High-Performer-Spring-LATAM3.-png.png`,
    alt: 'G2 High Performer Spring LATAM',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/High-Performer-Small-Latam3.png`,
    alt: 'G2 High Performer Small Business LATAM',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2023/05/g2-users-love-us.webp`,
    alt: 'G2 users love us',
    href: PARTNERS.g2Reviews,
    w: 199,
    h: 222,
  },
  {
    src: `${UPLOADS}/2024/05/score_hubspot_marketplace-e1726874629833.webp`,
    alt: 'HubSpot Marketplace score',
    href: PARTNERS.hubspot,
    w: 200,
    h: 154,
  },
  {
    src: `${UPLOADS}/2023/05/hubspot_solution_provider-e1726874685339.webp`,
    alt: 'HubSpot Solution Provider',
    href: PARTNERS.hubspot,
    w: 200,
    h: 172,
  },
];

function buildBadgeMarquee(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-cac__marquee';
  wrap.setAttribute('data-aa-badges-marquee', '');

  const track = document.createElement('div');
  track.className = 'aa-cac__track';
  BADGES.forEach((b) => {
    const a = document.createElement('a');
    a.className = 'aa-cac__badge';
    a.href = b.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    const img = document.createElement('img');
    img.src = b.src;
    img.alt = b.alt;
    img.width = b.w;
    img.height = b.h;
    img.loading = 'lazy';
    a.appendChild(img);
    track.appendChild(a);
  });

  wrap.appendChild(track);
  return wrap;
}

function buildText(): HTMLElement {
  const s = strings().cac;
  const col = document.createElement('div');
  col.className = 'aa-cac__text aa-stack aa-stack--center';

  const eyebrow = renderEyebrow(s.eyebrow);
  eyebrow.setAttribute('data-aa-fade', '');

  const heading = renderHeading({
    size: 'xl',
    text: s.heading,
    split: true,
    className: 'aa-text-balance',
  });

  const body = renderParagraph({ size: 'l', text: s.body });
  body.setAttribute('data-aa-fade', '');

  const row = document.createElement('div');
  row.className = 'aa-cta-row';
  row.setAttribute('data-aa-fade', '');
  row.appendChild(renderButton({ label: s.cta, href: '#aa-waitlist', variant: 'primary' }));

  col.append(eyebrow, heading, body, row);
  return col;
}

export function renderCac(root: Element): void {
  const grid = document.createElement('div');
  grid.className = 'aa-cac__grid';
  grid.append(buildText(), buildBadgeMarquee());

  const section = renderSection({
    theme: 'light',
    className: 'aa-cac',
    children: [renderContainer({ children: [grid] })],
  });
  section.id = 'aa-cac';
  root.appendChild(section);
}
