export type Theme = 'light' | 'dark';
export type Lang = 'es' | 'en' | 'pt';

export interface LandingConfig {
  theme: Theme;
  lang: Lang;
}

export interface MountAttrs {
  theme: Theme;
  lang: Lang;
}
