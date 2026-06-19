// Contrato del widget ContactForm. El motor es genérico e i18n-agnóstico: recibe strings
// ya resueltos (no claves), así no se acopla a la capa i18n ni al cliente HTTP. El preset
// que lo usa es quien puentea a strings()/client.

export interface FieldSpec {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  required?: boolean;
  autocomplete?: string;
  // Validación extra además de "no vacío" (ej. regex de email/teléfono).
  validate?: (value: string) => boolean;
  // Mensaje cuando el campo falla (required o validate).
  errorMsg?: string;
  // Ocupa una fila completa en vez de emparejarse de a dos (como el teléfono).
  fullWidth?: boolean;
}

export interface ConsentSpec {
  name: string;
  labelHtml: string;
  required?: boolean;
}

export interface ContactFormCopy {
  validationError: string; // note cuando la validación del form falla
  loading: string;
  success: string;
  error: string;
}

export interface ContactFormIntro {
  eyebrow?: string;
  heading: string;
  lead?: string;
}

export interface ContactFormConfig {
  // Id de la sección/ancla (ej. 'aa-waitlist' para que los CTAs apunten ahí).
  id?: string;
  fields: FieldSpec[];
  consent?: ConsentSpec;
  // Nombre del campo trampa anti-bot; debe llegar vacío al servidor.
  honeypot?: string;
  submitLabel: string;
  copy: ContactFormCopy;
  // Punto de unión con el backend. La página decide cómo enviar (client.ts, fetch, mock).
  onSubmit: (payload: Record<string, string>) => Promise<{ ok: boolean }>;
  // Efecto tras un envío exitoso (ej. redirect). Corre después de mostrar el éxito.
  onSuccess?: () => void;
  intro?: ContactFormIntro;
}
