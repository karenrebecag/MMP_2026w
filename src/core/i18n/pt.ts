import type { Strings } from './strings';

export const pt = {
  navbar: {
    cta: 'Entrar na lista de espera',
  },
  hero: {
    tag: 'Inteligência de Conversão para WhatsApp',
    titleBefore: 'Seu chatbot responde, nossa IA',
    titleWords: ['vende', 'converte', 'fecha', 'agenda'],
    subtitle:
      'Promova seus vendedores a **supervisores da IA** que qualifica leads, fecha vendas e reduz os custos de aquisição **em até 30%**.',
    ctaPrimary: 'Agendar demo',
    ctaSecondary: 'Ver demo',
    messages: [
      'Quanto custa?',
      'Tenho interesse',
      'Está disponível?',
      'Quero mais info',
      'Fazem entregas?',
      'Tem promoção?',
      'Aceitam cartão?',
      'Quero comprar',
    ],
  },
  heroClassic: {
    title: 'Torne-se Especialista em WhatsApp Marketing',
    subtitle:
      'A primeira formação para dominar o canal onde hoje se geram, qualificam e fecham mais oportunidades.',
    ctaLabel: 'Entrar na lista de espera',
    footnote: '* Primeira edição em julho · acesso prioritário para a lista de espera.',
  },
  waitlist: {
    eyebrow: 'Lista de espera · Lançamento em julho',
    heading: 'Entre na lista de espera',
    lead: 'Nesta primeira edição, o acesso será exclusivo para quem se cadastrar. Deixe seus dados e avisaremos antes da abertura geral.',
    fields: {
      name: { label: 'Nome', placeholder: 'Seu nome' },
      email: { label: 'E-mail', placeholder: 'seunome@email.com' },
      company: { label: 'Empresa', placeholder: 'Empresa onde você trabalha' },
      role: { label: 'Cargo', placeholder: 'Seu cargo ou função' },
      phone: { label: 'Telefone', placeholder: '+55 11 91234-5678' },
    },
    privacy: {
      before: 'Concordo em receber informações sobre a formação e a ',
      link: 'política de privacidade',
      after: '.',
    },
    submit: 'Entrar na lista de espera',
    validation: {
      name: 'Informe seu nome.',
      email: 'Informe um e-mail válido.',
      company: 'Informe sua empresa.',
      role: 'Informe seu cargo.',
      phone: 'Informe um telefone válido.',
      form: 'Verifique os campos destacados.',
    },
    status: {
      loading: 'Enviando…',
      success: 'Pronto! Avisaremos você antes do lançamento.',
      error: 'Não foi possível enviar. Tente novamente em instantes.',
    },
  },
} satisfies Strings;
