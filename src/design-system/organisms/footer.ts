// Footer corporativo de ATOM adaptado al DS: tira de badges (partners/reviews),
// 4 columnas de links y barra inferior (logo + redes + dirección). Contenido reusado
// de atomchat.io; imágenes apuntan a sus URLs públicas. Sin FontAwesome (SVG inline).

import { renderContainer } from '../molecules/layout';
import { UPLOADS, SITE_LINKS, SOCIAL } from '../../core/config/brand';

interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

interface Social {
  name: string;
  href: string;
  icon: string;
}

// Íconos de redes (fill currentColor → heredan el color del ancla: --aa-fg, #fff en hover).
const SOCIAL_ICONS = {
  facebook: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M9.833 22V13.2H6.669V9.6H9.833V6.849C9.833 3.726 11.694 2 14.541 2C15.4757 2.01295 16.4082 2.09417 17.331 2.243V5.311H15.76C15.4921 5.27507 15.2196 5.29992 14.9626 5.38371C14.7057 5.4675 14.4709 5.60808 14.2757 5.79502C14.0805 5.98195 13.9299 6.21044 13.8351 6.46354C13.7403 6.71663 13.7037 6.98783 13.728 7.257V9.6H17.185L16.633 13.2H13.733V22H9.833Z" fill="currentColor"></path></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M21.94 7.88C21.9206 7.0503 21.7652 6.2294 21.48 5.45C21.2283 4.78181 20.8322 4.17742 20.32 3.68C19.8226 3.16776 19.2182 2.77166 18.55 2.52C17.7706 2.23484 16.9497 2.07945 16.12 2.06C15.06 2 14.72 2 12 2C9.28 2 8.94 2 7.88 2.06C7.0503 2.07945 6.2294 2.23484 5.45 2.52C4.78181 2.77166 4.17742 3.16776 3.68 3.68C3.16743 4.17518 2.77418 4.78044 2.53 5.45C2.23616 6.22734 2.07721 7.04915 2.06 7.88C2 8.94 2 9.28 2 12C2 14.72 2 15.06 2.06 16.12C2.07721 16.9508 2.23616 17.7727 2.53 18.55C2.77418 19.2196 3.16743 19.8248 3.68 20.32C4.17742 20.8322 4.78181 21.2283 5.45 21.48C6.2294 21.7652 7.0503 21.9206 7.88 21.94C8.94 22 9.28 22 12 22C14.72 22 15.06 22 16.12 21.94C16.9497 21.9206 17.7706 21.7652 18.55 21.48C19.2134 21.219 19.816 20.8242 20.3201 20.3201C20.8242 19.816 21.219 19.2134 21.48 18.55C21.7652 17.7706 21.9206 16.9497 21.94 16.12C21.94 15.06 22 14.72 22 12C22 9.28 22 8.94 21.94 7.88ZM20.14 16C20.1327 16.6348 20.0178 17.2637 19.8 17.86C19.6327 18.2913 19.3773 18.683 19.0501 19.0101C18.723 19.3373 18.3313 19.5927 17.9 19.76C17.3037 19.9778 16.6748 20.0927 16.04 20.1C15.04 20.15 14.67 20.16 12.04 20.16C9.41 20.16 9.04 20.16 8.04 20.1C7.38073 20.1148 6.72401 20.0132 6.1 19.8C5.66869 19.6327 5.27698 19.3773 4.94985 19.0501C4.62272 18.723 4.36734 18.3313 4.2 17.9C3.97775 17.2911 3.86271 16.6482 3.86 16C3.86 15 3.8 14.63 3.8 12C3.8 9.37 3.8 9 3.86 8C3.86271 7.35178 3.97775 6.70893 4.2 6.1C4.36734 5.66869 4.62272 5.27698 4.94985 4.94985C5.27698 4.62272 5.66869 4.36734 6.1 4.2C6.70893 3.97775 7.35178 3.86271 8 3.86C9 3.86 9.37 3.8 12 3.8C14.63 3.8 15 3.8 16 3.86C16.6348 3.86728 17.2637 3.98225 17.86 4.2C18.2913 4.36734 18.683 4.62272 19.0101 4.94985C19.3373 5.27698 19.5927 5.66869 19.76 6.1C19.9959 6.7065 20.1245 7.34942 20.14 8C20.19 9 20.2 9.37 20.2 12C20.2 14.63 20.19 15 20.14 16Z" fill="currentColor"></path><path d="M12 6.86C10.9834 6.86 9.98964 7.16146 9.14437 7.72625C8.2991 8.29104 7.64029 9.0938 7.25126 10.033C6.86222 10.9722 6.76044 12.0057 6.95876 13.0028C7.15709 13.9998 7.64663 14.9157 8.36547 15.6345C9.08431 16.3534 10.0002 16.8429 10.9972 17.0412C11.9943 17.2396 13.0278 17.1378 13.967 16.7487C14.9062 16.3597 15.709 15.7009 16.2738 14.8556C16.8385 14.0104 17.14 13.0166 17.14 12C17.14 10.6368 16.5985 9.32941 15.6345 8.36547C14.6706 7.40153 13.3632 6.86 12 6.86ZM12 15.33C11.3414 15.33 10.6976 15.1347 10.15 14.7688C9.60234 14.4029 9.17552 13.8828 8.92348 13.2743C8.67144 12.6659 8.6055 11.9963 8.73399 11.3503C8.86247 10.7044 9.17963 10.111 9.64533 9.64533C10.111 9.17963 10.7044 8.86247 11.3503 8.73399C11.9963 8.6055 12.6659 8.67144 13.2743 8.92348C13.8828 9.17552 14.4029 9.60234 14.7688 10.15C15.1347 10.6976 15.33 11.3414 15.33 12C15.33 12.4373 15.2439 12.8703 15.0765 13.2743C14.9092 13.6784 14.6639 14.0454 14.3547 14.3547C14.0454 14.6639 13.6784 14.9092 13.2743 15.0765C12.8703 15.2439 12.4373 15.33 12 15.33Z" fill="currentColor"></path><path d="M17.34 5.46001C17.1027 5.46001 16.8707 5.53039 16.6733 5.66224C16.476 5.7941 16.3222 5.98152 16.2313 6.20079C16.1405 6.42006 16.1168 6.66134 16.1631 6.89411C16.2094 7.12689 16.3236 7.34071 16.4915 7.50853C16.6593 7.67636 16.8731 7.79065 17.1059 7.83695C17.3387 7.88325 17.5799 7.85949 17.7992 7.76866C18.0185 7.67784 18.2059 7.52403 18.3378 7.32669C18.4696 7.12935 18.54 6.89734 18.54 6.66001C18.54 6.34175 18.4136 6.03652 18.1885 5.81148C17.9635 5.58643 17.6583 5.46001 17.34 5.46001Z" fill="currentColor"></path></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M22.062 6.92699C21.9402 6.49091 21.708 6.09363 21.3878 5.77357C21.0675 5.45351 20.6701 5.2215 20.234 5.09999C18.597 4.66099 12.01 4.66099 12.01 4.66099C12.01 4.66099 5.43899 4.65199 3.78499 5.09999C3.34884 5.2215 2.95143 5.45351 2.63119 5.77357C2.31096 6.09363 2.07873 6.49091 1.95699 6.92699C1.64646 8.60303 1.49346 10.3044 1.49999 12.009C1.49417 13.7068 1.64683 15.4015 1.95599 17.071C2.07752 17.5076 2.30976 17.9053 2.6302 18.2258C2.95064 18.5462 3.34842 18.7785 3.78499 18.9C5.41999 19.34 12.01 19.34 12.01 19.34C12.01 19.34 18.58 19.34 20.234 18.9C20.6701 18.7785 21.0675 18.5465 21.3878 18.2264C21.708 17.9064 21.9402 17.5091 22.062 17.073C22.3647 15.4029 22.5113 13.7083 22.5 12.011C22.5124 10.3064 22.3658 8.60435 22.062 6.92699ZM9.90699 15.152V8.85199L15.39 12.005L9.90699 15.152Z" fill="currentColor"></path></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20.9 20.9H17.166V15.053C17.166 13.659 17.138 11.865 15.222 11.865C13.277 11.865 12.98 13.382 12.98 14.95V20.9H9.249V8.87699H12.833V10.516H12.881C13.2402 9.90278 13.7588 9.39838 14.3818 9.05643C15.0048 8.71447 15.7088 8.54775 16.419 8.57399C20.199 8.57399 20.898 11.062 20.898 14.3V20.9H20.9ZM5.036 7.23199C4.60732 7.23259 4.1881 7.10603 3.83137 6.86832C3.47463 6.63061 3.19641 6.29244 3.03191 5.89658C2.8674 5.50072 2.824 5.06497 2.9072 4.64444C2.99039 4.22392 3.19644 3.83751 3.49928 3.53411C3.80212 3.23071 4.18815 3.02395 4.60852 2.93998C5.02889 2.85601 5.46473 2.8986 5.86089 3.06237C6.25705 3.22615 6.59573 3.50374 6.8341 3.86003C7.07246 4.21633 7.1998 4.63532 7.2 5.06399C7.20039 5.34847 7.14472 5.63024 7.03615 5.89319C6.92759 6.15615 6.76827 6.39512 6.5673 6.59647C6.36633 6.79781 6.12764 6.95757 5.86489 7.06662C5.60214 7.17567 5.32048 7.23186 5.036 7.23199ZM6.906 20.9H3.165V8.87699H6.906V20.9Z" fill="currentColor"></path></svg>`,
};

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
  { name: 'Facebook', href: SOCIAL.facebook, icon: SOCIAL_ICONS.facebook },
  { name: 'Instagram', href: SOCIAL.instagram, icon: SOCIAL_ICONS.instagram },
  { name: 'YouTube', href: SOCIAL.youtube, icon: SOCIAL_ICONS.youtube },
  { name: 'LinkedIn', href: SOCIAL.linkedin, icon: SOCIAL_ICONS.linkedin },
];

// TODO(icons): chevron eliminado. Reintegrar como atom `icons.ts`.

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
    a.setAttribute('aria-label', s.name);
    a.innerHTML = s.icon;
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
      children: [buildLinks(), buildBottom()],
    }),
  );

  root.appendChild(footer);
}
