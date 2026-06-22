// Renderers genéricos por tipo de sección + ensamblado en orden desde content.ts.
// Reutiliza el lenguaje OSMO: container/section, headings con SplitText, reveals,
// card grid (playful-cards), checklist y accordion.

import {
  renderSection,
  renderContainer,
  renderGrid,
  type ContainerSize,
} from '../molecules/layout';
import { renderEyebrow, renderHeading, renderParagraph } from '../atoms/text';
import { renderButton } from '../atoms/button';
import { renderRotatingHeading } from '../behaviors/rotating-text';
import { renderChatTrack } from '../behaviors/chat';
import { renderAccordion } from '../behaviors/accordion';
import { buildManifesto } from './manifesto';
import { buildAudience } from './audience';
import { contourTexture } from '../../assets/r2';
import {
  getSections,
  type SectionContent,
  type ProseContent,
  type CardsContent,
  type ChecklistContent,
  type InfoContent,
  type FaqContent,
  type CtaContent,
  type ReviewsContent,
  type ReviewItem,
  type TabsContent,
} from '../../content';

const CHECK_ICON =
  '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';

function stack(center = false): HTMLElement {
  const el = document.createElement('div');
  el.className = center ? 'aa-stack aa-stack--center' : 'aa-stack';
  return el;
}

function fadeParagraph(text: string): HTMLElement {
  const p = renderParagraph({ size: 'l', text });
  p.setAttribute('data-aa-fade', '');
  return p;
}

function fadeEyebrow(text: string): HTMLElement {
  const e = renderEyebrow(text);
  e.setAttribute('data-aa-fade', '');
  return e;
}

function ctaRow(cta: { label: string; href: string }): HTMLElement {
  const row = document.createElement('div');
  row.className = 'aa-cta-row';
  row.setAttribute('data-aa-fade', '');
  row.appendChild(renderButton({ label: cta.label, href: cta.href, variant: 'primary' }));
  return row;
}

type ChatBubble = { kind: 'in' | 'out'; text: string; time: string };
type MediaCfg = { side: 'left' | 'right'; src?: string; alt?: string; chat?: ChatBubble[] };

// Overlay de conversación WhatsApp animada sobre la foto (motor en behaviors/chat.ts).
function buildChatOverlay(chat: ChatBubble[]): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-split__chat';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.appendChild(renderChatTrack(chat));
  return wrap;
}
type SurfaceCfg = { color: string; text?: 'light' | 'dark' };

function mediaOf(c: SectionContent): MediaCfg | undefined {
  return c.kind === 'prose' || c.kind === 'statement' || c.kind === 'checklist'
    ? c.media
    : undefined;
}
function surfaceOf(c: SectionContent): SurfaceCfg | undefined {
  return c.kind === 'prose' || c.kind === 'statement' || c.kind === 'checklist'
    ? c.surface
    : undefined;
}

// Envuelve el contenido (texto) + una imagen lateral en dos columnas. side=left → imagen
// primero. Si no hay src, deja un placeholder (para cambiar por la imagen real después).
function twoCol(textEl: HTMLElement, media: MediaCfg): HTMLElement {
  const row = document.createElement('div');
  row.className = `aa-split aa-split--${media.side}`;

  const textCol = document.createElement('div');
  textCol.className = 'aa-split__text';
  textCol.appendChild(textEl);

  const mediaCol = document.createElement('div');
  mediaCol.className = 'aa-split__media';
  mediaCol.setAttribute('data-aa-fade', '');
  if (media.src) {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = media.alt ?? '';
    img.loading = 'lazy';
    img.decoding = 'async';
    mediaCol.appendChild(img);
    if (media.chat?.length) mediaCol.appendChild(buildChatOverlay(media.chat));
  } else {
    mediaCol.classList.add('aa-split__media--placeholder');
    const label = document.createElement('span');
    label.className = 'aa-split__placeholder-label';
    label.textContent = 'Imagen';
    mediaCol.appendChild(label);
  }

  row.append(textCol, mediaCol);
  return row;
}

function buildProse(c: ProseContent): HTMLElement {
  const center = c.kind === 'statement';
  const s = stack(center);
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  if (c.rotate) {
    s.appendChild(
      renderRotatingHeading({
        size: center ? 'xl' : 'l',
        before: c.rotate.before,
        words: c.rotate.words,
        after: c.rotate.after,
        block: c.rotate.block,
      }),
    );
  } else {
    s.appendChild(
      renderHeading({
        size: center ? 'xl' : 'l',
        text: c.heading,
        split: true,
        className: center ? 'aa-text-balance' : undefined,
      }),
    );
  }
  c.paragraphs.forEach((p) => s.appendChild(fadeParagraph(p)));
  if (c.faq?.length) {
    s.appendChild(fadeEyebrow('Preguntas frecuentes'));
    const acc = renderAccordion(c.faq);
    acc.setAttribute('data-aa-fade', '');
    s.appendChild(acc);
  }
  if (c.cta) s.appendChild(ctaRow(c.cta));
  return c.media ? twoCol(s, c.media) : s;
}

function buildList(c: ChecklistContent): HTMLElement {
  const marker = c.marker ?? 'check';
  const ul = document.createElement('ul');
  ul.className = `aa-list aa-list--${marker}`;
  ul.setAttribute('data-aa-fade', '');
  c.items.forEach((text) => {
    const li = document.createElement('li');
    li.className = 'aa-list__item';
    const m = document.createElement('span');
    m.className = 'aa-list__marker';
    if (marker === 'check') m.innerHTML = CHECK_ICON;
    const t = document.createElement('span');
    t.textContent = text;
    li.append(m, t);
    ul.appendChild(li);
  });
  return ul;
}

function buildChecklist(c: ChecklistContent): HTMLElement {
  const s = stack();
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(renderHeading({ size: 'l', text: c.heading, split: true }));
  (c.intro ?? []).forEach((p) => s.appendChild(fadeParagraph(p)));
  s.appendChild(buildList(c));
  (c.outro ?? []).forEach((p) => s.appendChild(fadeParagraph(p)));
  if (c.cta) s.appendChild(ctaRow(c.cta));
  return c.media ? twoCol(s, c.media) : s;
}

// Layout info — réplica de la sección .info de OSMO: columna gráfica + columna grande
// con scribble flotante (coral), statement y lista de filas label/párrafo.
function buildInfo(c: InfoContent): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-info__wrap';

  const large = document.createElement('div');
  large.className = 'aa-info__large-col';

  large.appendChild(
    c.rotate
      ? renderRotatingHeading({
          size: 'l',
          tag: 'h3',
          before: c.rotate.before,
          words: c.rotate.words,
          after: c.rotate.after,
          block: c.rotate.block,
          className: 'aa-info__title',
        })
      : renderHeading({
          size: 'l',
          text: c.heading,
          tag: 'h3',
          split: true,
          className: 'aa-info__title',
        }),
  );

  const ul = document.createElement('ul');
  ul.className = 'aa-info__list';
  c.items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'aa-info__li';
    li.setAttribute('data-aa-fade', '');
    const liTitle = document.createElement('div');
    liTitle.className = 'aa-info__li-title';
    liTitle.appendChild(renderHeading({ size: 'm', text: item.title, tag: 'h4' }));
    const desc = renderParagraph({ size: 'm', text: item.desc, className: 'aa-info__li-desc' });
    li.append(liTitle, desc);
    ul.appendChild(li);
  });
  large.appendChild(ul);

  wrap.appendChild(large);
  return wrap;
}

function cardEl(card: { title: string; desc: string }): HTMLElement {
  const el = document.createElement('article');
  el.className = 'aa-card';
  el.appendChild(renderHeading({ size: 'm', text: card.title, tag: 'h3' }));
  el.appendChild(renderParagraph({ size: 'm', text: card.desc }));
  return el;
}

// Card-módulo — réplica de la product-card de OSMO: spacer de aspect ratio (__before),
// capa de fondo (__bg) y __content con __tags arriba + __center centrado.
function moduleCardEl(card: {
  title: string;
  desc: string;
  tag?: string;
  variant?: 'dark' | 'electric' | 'purple' | 'neutral' | 'mint' | 'lavender' | 'peach' | 'sky';
}): HTMLElement {
  const el = document.createElement('article');
  el.className = 'aa-mod-card';
  if (card.variant) el.classList.add(`aa-mod-card--${card.variant}`);

  const before = document.createElement('div');
  before.className = 'aa-mod-card__before';
  const bg = document.createElement('div');
  bg.className = 'aa-mod-card__bg'; // textura topográfica sobre el color (detrás del texto)
  bg.style.backgroundImage = `url(${contourTexture})`;

  const content = document.createElement('div');
  content.className = 'aa-mod-card__content';

  const tags = document.createElement('div');
  tags.className = 'aa-mod-card__tags';
  if (card.tag) {
    const tag = document.createElement('span');
    tag.className = 'aa-mod-card__tag';
    tag.textContent = card.tag;
    tags.appendChild(tag);
  }

  const center = document.createElement('div');
  center.className = 'aa-mod-card__center';
  const title = document.createElement('h3');
  title.className = 'aa-mod-card__h';
  title.textContent = card.title;
  const desc = document.createElement('p');
  desc.className = 'aa-mod-card__p';
  desc.textContent = card.desc;
  center.append(title, desc);

  content.append(tags, center);
  el.append(before, bg, content);
  return el;
}

function buildCards(c: CardsContent): HTMLElement {
  const s = stack();
  if (c.eyebrow) {
    const eyebrow = fadeEyebrow(c.eyebrow);
    eyebrow.classList.add('aa-text-center');
    s.appendChild(eyebrow);
  }
  if (c.heading) {
    s.appendChild(
      renderHeading({ size: 'l', text: c.heading, split: true, className: 'aa-text-center' }),
    );
  }

  if (c.layout === 'slider') {
    const slider = document.createElement('div');
    slider.className = 'aa-slider';
    slider.setAttribute('data-aa-slider', '');
    slider.setAttribute('data-aa-fade', '');
    // A11y: región enfocable y navegable por teclado (flechas / Home / End).
    slider.setAttribute('role', 'group');
    slider.setAttribute('aria-roledescription', 'carrusel');
    slider.setAttribute('aria-label', c.heading || c.eyebrow || 'Tarjetas');
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight Home End');
    const track = document.createElement('div');
    track.className = 'aa-slider__track';
    track.setAttribute('data-aa-slider-track', '');
    // Slot estable (flex item) + cara que se mueve dentro: el sway desplaza la cara
    // sin alterar la geometría del slot (lo que observa el IntersectionObserver).
    c.cards.forEach((card) => {
      const slot = document.createElement('div');
      slot.className = 'aa-slider__item';
      slot.appendChild(moduleCardEl(card));
      track.appendChild(slot);
    });
    slider.appendChild(track);
    s.appendChild(slider);
    return s;
  }

  const grid = renderGrid({
    cols: 3,
    attrs: { 'data-aa-stagger': '' },
    children: c.cards.map(cardEl),
  });
  s.appendChild(grid);
  return s;
}

function buildFaq(c: FaqContent): HTMLElement {
  const s = stack();
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(renderHeading({ size: 'l', text: c.heading, split: true }));
  const acc = renderAccordion(c.items);
  acc.setAttribute('data-aa-fade', '');
  s.appendChild(acc);
  return s;
}

function buildCta(c: CtaContent): HTMLElement {
  const s = stack(true);
  s.appendChild(
    renderHeading({ size: 'xl', text: c.heading, split: true, className: 'aa-text-balance' }),
  );
  (c.paragraphs ?? []).forEach((p) => s.appendChild(fadeParagraph(p)));
  s.appendChild(ctaRow(c.cta));
  return s;
}

function renderBgVideo(m: NonNullable<CtaContent['bgVideo']>): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-section__media';
  wrap.setAttribute('aria-hidden', 'true');

  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.poster = m.poster;

  const webm = document.createElement('source');
  webm.src = m.webm;
  webm.type = 'video/webm';
  const mp4 = document.createElement('source');
  mp4.src = m.mp4;
  mp4.type = 'video/mp4';
  video.append(webm, mp4);

  wrap.appendChild(video);
  return wrap;
}

// Reseñas: dos filas de cards (marquee scroll-driven en sentidos opuestos, init en
// behaviors/reviews-marquee). El color de cada card rota por nth-child (tokens de marca).
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function reviewStars(rating: number): HTMLElement {
  const row = document.createElement('div');
  row.className = 'aa-reviews__stars';
  row.setAttribute('aria-label', `${rating}/5`);
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    star.className = i < rating ? 'aa-reviews__star is-on' : 'aa-reviews__star';
    star.textContent = '★';
    star.setAttribute('aria-hidden', 'true');
    row.appendChild(star);
  }
  return row;
}

function reviewCard(r: ReviewItem): HTMLElement {
  const card = document.createElement('article');
  card.className = 'aa-reviews__card';

  // El inner es el objetivo del lag por velocidad (children[0], como en el snippet).
  const inner = document.createElement('div');
  inner.className = 'aa-reviews__card-inner';

  const quote = document.createElement('p');
  quote.className = 'aa-reviews__quote';
  quote.textContent = `“${r.quote}”`;

  const author = document.createElement('div');
  author.className = 'aa-reviews__author';
  const avatar = document.createElement('span');
  avatar.className = 'aa-reviews__avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = initialsOf(r.name);
  const meta = document.createElement('span');
  meta.className = 'aa-reviews__meta';
  const name = document.createElement('strong');
  name.className = 'aa-reviews__name';
  name.textContent = r.name;
  const role = document.createElement('span');
  role.className = 'aa-reviews__role';
  role.textContent = r.role;
  meta.append(name, role);
  author.append(avatar, meta);

  inner.append(reviewStars(r.rating), quote, author);
  card.appendChild(inner);
  return card;
}

function reviewRow(items: ReviewItem[], modifier: '1' | '2'): HTMLElement {
  const row = document.createElement('div');
  row.className = `aa-reviews__row aa-reviews__row--${modifier}`;
  const track = document.createElement('div');
  track.className = 'aa-reviews__track';
  items.forEach((r) => track.appendChild(reviewCard(r)));
  row.appendChild(track);
  return row;
}

function buildReviews(c: ReviewsContent): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-reviews';
  wrap.setAttribute('data-aa-reviews', '');

  const head = document.createElement('div');
  head.className = 'aa-container aa-container--default aa-reviews__head';
  const s = stack(true);
  if (c.eyebrow) s.appendChild(fadeEyebrow(c.eyebrow));
  s.appendChild(
    renderHeading({ size: 'xl', text: c.heading, split: true, className: 'aa-text-balance' }),
  );
  if (c.subheading) s.appendChild(fadeParagraph(c.subheading));
  head.appendChild(s);

  const rows = document.createElement('div');
  rows.className = 'aa-reviews__rows';
  const mid = Math.ceil(c.reviews.length / 2);
  rows.append(reviewRow(c.reviews.slice(0, mid), '1'), reviewRow(c.reviews.slice(mid), '2'));

  wrap.append(head, rows);
  return wrap;
}

// Marca `*palabra*` → span con gradiente de marca; el resto cae a text nodes. Sin innerHTML.
function appendWithGradient(el: HTMLElement, text: string): void {
  text.split(/\*(.+?)\*/g).forEach((part, i) => {
    if (!part) return;
    if (i % 2 === 1) {
      const span = document.createElement('span');
      span.className = 'aa-text-gradient';
      span.textContent = part;
      el.appendChild(span);
    } else {
      el.appendChild(document.createTextNode(part));
    }
  });
}

// Sección "motor de IA": selector de tabs (carbon dark) que alterna paneles de dos
// columnas (texto izq + imagen der). Switch en behaviors/tabs.
function buildTabs(c: TabsContent): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-tabs';
  wrap.setAttribute('data-aa-tabs', '');

  const head = stack(true); // contenido superior centrado
  head.classList.add('aa-tabs__head');
  if (c.eyebrow) head.appendChild(fadeEyebrow(c.eyebrow));
  // Heading con highlight en gradiente (`*…*`) + SplitText on-scroll (como whatAtom).
  const heading = document.createElement('h2');
  heading.className = 'aa-h-xl';
  heading.setAttribute('data-aa-split', '');
  appendWithGradient(heading, c.heading);
  head.appendChild(heading);
  wrap.appendChild(head);

  const nav = document.createElement('div');
  nav.className = 'aa-tabs__nav';
  nav.setAttribute('role', 'tablist');

  const panels = document.createElement('div');
  panels.className = 'aa-tabs__panels';

  c.tabs.forEach((tab, i) => {
    const active = i === 0;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = active ? 'aa-tabs__tab is-active' : 'aa-tabs__tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(active));
    btn.setAttribute('data-aa-tab', String(i));
    btn.textContent = tab.label;
    nav.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = active ? 'aa-tabs__panel is-active' : 'aa-tabs__panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('data-aa-panel', String(i));
    if (!active) panel.hidden = true;

    const row = document.createElement('div');
    row.className = 'aa-split aa-split--right';

    const textCol = document.createElement('div');
    textCol.className = 'aa-split__text';
    const s = stack();
    s.appendChild(renderHeading({ size: 'l', text: tab.heading, tag: 'h3' }));
    tab.paragraphs.forEach((p) => s.appendChild(fadeParagraph(p)));
    textCol.appendChild(s);

    const mediaCol = document.createElement('div');
    mediaCol.className = 'aa-split__media';
    const img = document.createElement('img');
    img.src = tab.image.src;
    img.alt = tab.image.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    mediaCol.appendChild(img);

    row.append(textCol, mediaCol);
    panel.appendChild(row);
    panels.appendChild(panel);
  });

  wrap.append(nav, panels);
  return wrap;
}

function buildInner(c: SectionContent): HTMLElement {
  switch (c.kind) {
    case 'prose':
    case 'statement':
      return buildProse(c);
    case 'cards':
      return buildCards(c);
    case 'checklist':
      return buildChecklist(c);
    case 'manifesto':
      return buildManifesto(c);
    case 'audience':
      return buildAudience(c);
    case 'info':
      return buildInfo(c);
    case 'faq':
      return buildFaq(c);
    case 'cta':
      return buildCta(c);
    case 'reviews':
      return buildReviews(c);
    case 'tabs':
      return buildTabs(c);
  }
}

function sizeFor(kind: SectionContent['kind']): ContainerSize {
  if (kind === 'cards' || kind === 'info' || kind === 'manifesto' || kind === 'audience')
    return 'default';
  if (kind === 'statement') return 'm';
  return 'sm';
}

export function renderContentSections(root: Element): void {
  getSections().forEach((c) => {
    // Reseñas: full-bleed (sin el container estándar). buildReviews controla su layout
    // (header en container + filas a ancho completo para el marquee horizontal).
    if (c.kind === 'reviews') {
      const section = renderSection({
        theme: c.theme,
        className: 'aa-section--reviews',
        children: [buildReviews(c)],
      });
      if (c.id) section.id = c.id;
      root.appendChild(section);
      return;
    }
    // Tabs: sección "motor de IA" (selector + paneles dos columnas).
    if (c.kind === 'tabs') {
      const section = renderSection({
        theme: c.theme,
        className: 'aa-section--tabs',
        children: [renderContainer({ children: [buildTabs(c)] })],
      });
      if (c.id) section.id = c.id;
      root.appendChild(section);
      return;
    }
    const bgVideo = c.kind === 'cta' ? c.bgVideo : undefined;
    const media = mediaOf(c);
    const surface = surfaceOf(c);
    // Cards flotantes: info (superficie blanca) y generación (obsidian, vía section-theme).
    // Comparten el ancho default del footer y el comportamiento strip en móvil.
    const isCard = c.kind === 'info' || c.id === 'aa-generacion';
    const container = renderContainer({
      size: media || isCard ? 'default' : sizeFor(c.kind),
      className: isCard ? 'aa-container--card' : undefined,
      children: [buildInner(c)],
    });
    const section = renderSection({
      theme: c.theme,
      className: bgVideo ? 'aa-section--media' : surface ? 'aa-section--surface' : undefined,
      children: bgVideo ? [renderBgVideo(bgVideo), container] : [container],
    });
    if (c.id) section.id = c.id;
    if (surface) {
      // Superficie de color + textura: el color va en --aa-bg, la textura en ::before.
      section.style.setProperty('--aa-section-tex', `url(${contourTexture})`);
      section.style.setProperty('--aa-bg', surface.color);
      if (surface.text === 'dark') {
        // Texto oscuro sobre color claro (ej. verde): negros con jerarquía por opacidad.
        section.style.setProperty('--aa-fg', 'var(--aa-neutral-950)');
        section.style.setProperty(
          '--aa-fg-muted',
          'color-mix(in srgb, var(--aa-neutral-950) 82%, transparent)',
        );
        section.style.setProperty(
          '--aa-fg-subtle',
          'color-mix(in srgb, var(--aa-neutral-950) 64%, transparent)',
        );
        section.style.setProperty(
          '--aa-border',
          'color-mix(in srgb, var(--aa-neutral-950) 18%, transparent)',
        );
      } else {
        // Texto claro sobre color saturado (ej. morado): blancos con jerarquía por opacidad
        // (el gris muted por defecto da bajo contraste).
        section.style.setProperty('--aa-fg', '#ffffff');
        section.style.setProperty('--aa-fg-muted', 'rgba(255, 255, 255, 0.85)');
        section.style.setProperty('--aa-fg-subtle', 'rgba(255, 255, 255, 0.66)');
        section.style.setProperty('--aa-border', 'rgba(255, 255, 255, 0.22)');
      }
    }
    root.appendChild(section);
  });
}
