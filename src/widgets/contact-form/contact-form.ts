// Motor genérico del ContactForm: construye campos desde un schema, valida en cliente,
// gestiona estados del aviso (loading/success/error) y delega el envío en config.onSubmit.
// Sin acoplamiento a i18n ni al cliente HTTP — todo entra resuelto por config.

import { renderField, type FieldParts } from '../../design-system/atoms/input';
import { renderCheckbox } from '../../design-system/atoms/checkbox';
import { renderButton } from '../../design-system/atoms/button';
import { renderSection, renderContainer } from '../../design-system/molecules/layout';
import { renderEyebrow, renderHeading, renderParagraph } from '../../design-system/atoms/text';
import type { ContactFormConfig, FieldSpec } from './types';

function setError(field: HTMLElement, error: HTMLElement | null, message: string): void {
  field.classList.add('has-error');
  if (error) error.textContent = message;
}

function clearError(field: HTMLElement, error: HTMLElement | null): void {
  field.classList.remove('has-error');
  if (error) error.textContent = '';
}

// Checkmark animado (transitions.dev #10): data-state="in" desde el inicio porque el
// elemento se monta recién creado, así la animación corre al insertarse en el DOM.
function buildSuccessCheck(): HTMLElement {
  const wrap = document.createElement('span');
  wrap.className = 'aa-form__check t-success-check';
  wrap.setAttribute('data-state', 'in');
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" ' +
    'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return wrap;
}

// Loading usa shimmer (transitions.dev #15) sobre data-text.
function noteLoading(note: HTMLElement, msg: string): void {
  note.className = 'aa-form__note is--loading t-shimmer';
  note.setAttribute('data-text', msg);
  note.textContent = msg;
}
function noteError(note: HTMLElement, msg: string): void {
  note.className = 'aa-form__note is--error';
  note.removeAttribute('data-text');
  note.textContent = msg;
}
function noteSuccess(note: HTMLElement, msg: string): void {
  note.className = 'aa-form__note is--success';
  note.removeAttribute('data-text');
  const text = document.createElement('span');
  text.className = 'aa-form__note-text';
  text.textContent = msg;
  note.replaceChildren(buildSuccessCheck(), text);
}
function noteReset(note: HTMLElement): void {
  note.className = 'aa-form__note';
  note.removeAttribute('data-text');
  note.textContent = '';
}

interface BoundField {
  spec: FieldSpec;
  parts: FieldParts;
}

// Empareja campos de a dos por fila; los fullWidth ocupan su propia fila.
function layoutFields(form: HTMLElement, bound: BoundField[]): void {
  let pair: HTMLElement | null = null;
  for (const { spec, parts } of bound) {
    if (spec.fullWidth) {
      pair = null;
      form.appendChild(parts.field);
      continue;
    }
    if (!pair) {
      pair = document.createElement('div');
      pair.className = 'aa-form__row';
      form.appendChild(pair);
    }
    pair.appendChild(parts.field);
    if (pair.children.length === 2) pair = null;
  }
}

export function renderContactForm(root: Element, config: ContactFormConfig): void {
  const honeypotName = config.honeypot ?? 'company_url';

  // ── Intro (opcional) ─────────────────────────────────────────────────────────
  let intro: HTMLElement | null = null;
  if (config.intro) {
    intro = document.createElement('div');
    intro.className = 'aa-flex-col aa-text-center';
    intro.style.alignItems = 'center';
    intro.style.gap = 'var(--aa-gap-m)';
    intro.style.maxWidth = '44em';
    intro.style.marginInline = 'auto';

    if (config.intro.eyebrow) {
      const eyebrow = renderEyebrow(config.intro.eyebrow);
      eyebrow.setAttribute('data-aa-fade', '');
      intro.appendChild(eyebrow);
    }
    intro.appendChild(
      renderHeading({ size: 'l', text: config.intro.heading, tag: 'h2', split: true }),
    );
    if (config.intro.lead) {
      const lead = renderParagraph({
        size: 'l',
        text: config.intro.lead,
        className: 'aa-text-balance',
      });
      lead.setAttribute('data-aa-fade', '');
      intro.appendChild(lead);
    }
  }

  // ── Formulario ───────────────────────────────────────────────────────────────
  const form = document.createElement('form');
  form.className = 'aa-form';
  form.noValidate = true;
  form.setAttribute('data-aa-fade', '');
  form.setAttribute('data-aa-delay', '0.15');

  const bound: BoundField[] = config.fields.map((spec) => ({
    spec,
    parts: renderField({
      name: spec.name,
      label: spec.label,
      type: spec.type,
      placeholder: spec.placeholder,
      required: spec.required,
      autocomplete: spec.autocomplete,
    }),
  }));

  // Honeypot anti-bot: invisible y fuera del tab order. Debe llegar vacío al servidor.
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = honeypotName;
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;';

  layoutFields(form, bound);
  form.appendChild(honeypot);

  const consent = config.consent
    ? renderCheckbox({
        name: config.consent.name,
        required: config.consent.required,
        labelHtml: config.consent.labelHtml,
      })
    : null;
  if (consent) form.appendChild(consent.field);

  const submitWrap = document.createElement('div');
  submitWrap.className = 'aa-form__submit';
  const submit = renderButton({ label: config.submitLabel, variant: 'primary' });
  if (submit instanceof HTMLButtonElement) submit.type = 'submit';
  submitWrap.appendChild(submit);
  form.appendChild(submitWrap);

  const note = document.createElement('p');
  note.className = 'aa-form__note';
  note.setAttribute('role', 'status');
  note.setAttribute('aria-live', 'polite');
  form.appendChild(note);

  // ── Validación cliente ─────────────────────────────────────────────────────
  const validate = (): boolean => {
    let ok = true;
    for (const { spec, parts } of bound) {
      if (!spec.required && !spec.validate) continue;
      const value = parts.input.value.trim();
      const valid = spec.validate ? spec.validate(value) : value.length > 0;
      if (!valid) {
        setError(parts.field, parts.error, spec.errorMsg ?? '');
        ok = false;
      } else {
        clearError(parts.field, parts.error);
      }
    }
    if (consent && config.consent?.required && !consent.input.checked) {
      consent.field.classList.add('has-error');
      ok = false;
    } else if (consent) {
      consent.field.classList.remove('has-error');
    }
    return ok;
  };

  for (const { parts } of bound) {
    parts.input.addEventListener('input', () => clearError(parts.field, parts.error));
  }
  if (consent) {
    consent.input.addEventListener('change', () => consent.field.classList.remove('has-error'));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    noteReset(note);
    if (!validate()) {
      noteError(note, config.copy.validationError);
      return;
    }

    const payload: Record<string, string> = {};
    for (const { spec, parts } of bound) payload[spec.name] = parts.input.value.trim();
    payload[honeypotName] = honeypot.value;

    submit.setAttribute('disabled', '');
    noteLoading(note, config.copy.loading);
    try {
      const { ok } = await config.onSubmit(payload);
      if (!ok) throw new Error('request_failed');
      noteSuccess(note, config.copy.success);
      form.reset();
      if (config.onSuccess) config.onSuccess();
    } catch {
      noteError(note, config.copy.error);
    } finally {
      submit.removeAttribute('disabled');
    }
  });

  // ── Sección contenedora ──────────────────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'aa-flex-col';
  content.style.gap = 'var(--aa-gap-xl)';
  if (intro) content.appendChild(intro);
  content.appendChild(form);

  const section = renderSection({
    theme: 'light',
    children: [renderContainer({ className: 'aa-container--card', children: [content] })],
  });
  if (config.id) section.id = config.id;

  root.appendChild(section);
}
