// Footer corporativo de ATOM adaptado al DS: tira de badges (partners/reviews),
// 4 columnas de links y barra inferior (logo + redes + dirección). Contenido reusado
// de atomchat.io; imágenes apuntan a sus URLs públicas. Sin FontAwesome (SVG inline).

import { renderContainer } from '../molecules/layout';
import { UPLOADS, SITE_LINKS, SOCIAL, PARTNERS } from '../../core/config/brand';

interface Badge {
  src: string;
  alt: string;
  href: string;
  w: number;
  h: number;
}

interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

interface Social {
  name: string;
  href: string;
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

const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Términos y Condiciones',
    links: [
      { label: 'Términos y condiciones', href: SITE_LINKS.terms },
      { label: 'Política de privacidad', href: SITE_LINKS.privacy },
      { label: 'Términos suscripción', href: SITE_LINKS.subscriptionTerms },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Acerca de Atom', href: SITE_LINKS.about },
      { label: 'Sitio en Inglés', href: SITE_LINKS.english },
    ],
  },
  {
    title: 'Soporte',
    links: [{ label: 'Centro de Ayuda', href: SITE_LINKS.support }],
  },
  {
    title: 'Comunidad',
    links: [
      { label: 'Blog', href: SITE_LINKS.blog },
      { label: 'Tutoriales', href: SOCIAL.youtube },
    ],
  },
];

const SOCIALS: Social[] = [
  { name: 'Facebook', href: SOCIAL.facebook },
  { name: 'Instagram', href: SOCIAL.instagram },
  { name: 'YouTube', href: SOCIAL.youtube },
  { name: 'LinkedIn', href: SOCIAL.linkedin },
];

// TODO(icons): SVGs de redes + chevron eliminados. Reintegrar como atom `icons.ts`.

function buildBadges(): HTMLElement {
  const row = document.createElement('div');
  row.className = 'aa-footer__badges';
  row.setAttribute('data-aa-fade', '');
  BADGES.forEach((b) => {
    const a = document.createElement('a');
    a.className = 'aa-footer__badge';
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
    row.appendChild(a);
  });
  return row;
}

function buildLinks(): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'aa-footer__links';
  grid.setAttribute('data-aa-fade', '');
  LINK_GROUPS.forEach((group) => {
    const col = document.createElement('div');
    col.className = 'aa-footer__col';

    const title = document.createElement('span');
    title.className = 'aa-footer__col-title';
    title.textContent = group.title;
    col.appendChild(title);

    const ul = document.createElement('ul');
    ul.className = 'aa-footer__list';
    group.links.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'aa-footer__link';
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const chev = document.createElement('span');
      chev.className = 'aa-footer__chev'; // TODO(icons): chevron pendiente
      const label = document.createElement('span');
      label.textContent = link.label;
      a.append(chev, label);
      li.appendChild(a);
      ul.appendChild(li);
    });
    col.appendChild(ul);
    grid.appendChild(col);
  });
  return grid;
}

function buildBottom(): HTMLElement {
  const bottom = document.createElement('div');
  bottom.className = 'aa-footer__bottom';
  bottom.setAttribute('data-aa-fade', '');

  const logo = document.createElement('img');
  logo.className = 'aa-footer__logo';
  logo.src = `${UPLOADS}/2021/02/logo-atom.png`;
  logo.alt = 'ATOM';
  logo.width = 150;
  logo.height = 38;
  logo.loading = 'lazy';

  const socials = document.createElement('div');
  socials.className = 'aa-footer__socials';
  SOCIALS.forEach((s) => {
    const a = document.createElement('a');
    a.className = 'aa-footer__social';
    a.href = s.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', s.name); // TODO(icons): SVG de red pendiente
    socials.appendChild(a);
  });

  const address = document.createElement('p');
  address.className = 'aa-footer__address';
  address.textContent = 'StreetMall Piso 1, oficina 303 San Francisco, Panamá';

  bottom.append(logo, socials, address);
  return bottom;
}

export function renderFooter(root: Element): void {
  const footer = document.createElement('footer');
  footer.className = 'aa-footer';
  footer.setAttribute('data-aa-section-theme', 'light');

  footer.appendChild(
    renderContainer({
      className: 'aa-container--card',
      children: [buildBadges(), buildLinks(), buildBottom()],
    }),
  );

  root.appendChild(footer);
}
