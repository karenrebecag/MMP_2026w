// Preset "lista de espera": configura el ContactForm genérico con los campos, copy y
// endpoint de la waitlist original. Conservado por si se reutiliza; el sitio oficial
// usará otros presets (ej. "contact") sobre el mismo motor.

import { renderContactForm } from '..';
import { WAITLIST_ENDPOINT } from '../../../core/config/endpoints';
import { SITE_LINKS } from '../../../core/config/brand';
import { strings } from '../../../core/i18n';
import { api } from '../../../core/api/client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{6,}$/;

// El backend responde 200 {ok:true}; cualquier no-2xx lanza ApiError → {ok:false}.
async function postWaitlist(payload: Record<string, string>): Promise<{ ok: boolean }> {
  try {
    const data = await api.post<{ ok?: boolean }>(WAITLIST_ENDPOINT, payload);
    return { ok: data?.ok === true };
  } catch {
    return { ok: false };
  }
}

export function renderWaitlist(root: Element): void {
  // Snapshot del idioma activo: los handlers async cierran sobre `s`, no sobre el
  // singleton global (robusto si conviven varias instancias con distinto idioma).
  const s = strings().waitlist;

  renderContactForm(root, {
    id: 'aa-waitlist',
    intro: {
      eyebrow: s.eyebrow,
      heading: s.heading,
      lead: s.lead,
    },
    fields: [
      {
        name: 'name',
        label: s.fields.name.label,
        placeholder: s.fields.name.placeholder,
        required: true,
        autocomplete: 'name',
        errorMsg: s.validation.name,
      },
      {
        name: 'email',
        label: s.fields.email.label,
        type: 'email',
        placeholder: s.fields.email.placeholder,
        required: true,
        autocomplete: 'email',
        validate: (v) => EMAIL_RE.test(v),
        errorMsg: s.validation.email,
      },
      {
        name: 'company',
        label: s.fields.company.label,
        placeholder: s.fields.company.placeholder,
        required: true,
        autocomplete: 'organization',
        errorMsg: s.validation.company,
      },
      {
        name: 'role',
        label: s.fields.role.label,
        placeholder: s.fields.role.placeholder,
        required: true,
        autocomplete: 'organization-title',
        errorMsg: s.validation.role,
      },
      {
        name: 'phone',
        label: s.fields.phone.label,
        type: 'tel',
        placeholder: s.fields.phone.placeholder,
        required: true,
        autocomplete: 'tel',
        validate: (v) => PHONE_RE.test(v),
        errorMsg: s.validation.phone,
        fullWidth: true,
      },
    ],
    consent: {
      name: 'privacy',
      required: true,
      labelHtml: `${s.privacy.before}<a href="${SITE_LINKS.privacy}" target="_blank" rel="noopener noreferrer">${s.privacy.link}</a>${s.privacy.after}`,
    },
    submitLabel: s.submit,
    copy: {
      validationError: s.validation.form,
      loading: s.status.loading,
      success: s.status.success,
      error: s.status.error,
    },
    onSubmit: postWaitlist,
    onSuccess: () => {
      // Redirige en la misma pestaña tras mostrar el éxito un instante.
      window.setTimeout(() => {
        window.location.href = SITE_LINKS.home;
      }, 1200);
    },
  });
}
