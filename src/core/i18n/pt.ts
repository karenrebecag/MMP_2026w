import type { Strings } from './strings';

export const pt = {
  navbar: {
    cta: 'Agendar demo',
  },
  hero: {
    tag: 'Inteligência de Conversão para WhatsApp',
    titleBefore: 'Seu chatbot responde, nossa IA',
    titleWords: ['vende', 'converte', 'fecha', 'agenda'],
    titleAfter: 'pelo WhatsApp',
    subtitle:
      'Promova seus vendedores a **supervisores da IA** que qualifica leads, fecha vendas e reduz os custos de aquisição **em até 30%**.',
    ctaPrimary: 'Agendar demo',
    ctaSecondary: 'Ver demo',
    messages: [
      'O SUV está em estoque?',
      'Quando abrem as inscrições?',
      'Como aumento meu limite?',
      'Quero cotar o sedã',
      'Tem bolsa disponível?',
      'Quero um empréstimo',
      'Fazem test drive?',
      'Tem modalidade online?',
      'Qual taxa vocês oferecem?',
    ],
    replies: [
      'Te envio o estoque disponível hoje',
      'Inscrições abertas, te passo as datas',
      'Aprovado: aumentando seu limite agora',
      'Sua cotação fica pronta em um minuto',
      'Sim, temos bolsa para seu curso',
      'Crédito pré-aprovado, te envio o link',
      'Agendo seu test drive hoje',
      'Sim, 100% online, te explico',
      'Taxa preferencial nesta semana',
    ],
  },
  whatAtom: {
    label: 'O que o atom faz',
    titleL1: 'Conversa, qualifica e *fecha.*',
    titleL2: 'Tudo no seu *WhatsApp.*',
    lead: 'atom responde a cada lead na hora, qualifica e agenda a venda. Sua equipe só supervisiona e fecha.',
  },
  leadFlow: {
    scroll: 'Role',
    steps: [
      'Um lead escreve',
      'atom responde e qualifica',
      'agenda a venda',
      'sua equipe fecha',
      'e cada venda otimiza sua mídia',
    ],
  },
  onboarding: {
    scroll: 'Role',
    cta: 'Agendar demo',
    panelLabel: 'Prévia',
    steps: [
      {
        title: 'Desenhamos os fluxos com você',
        desc: 'Criamos junto à sua equipe os cenários onde a IA conversa com seus leads, conforme seus processos e objetivos, aproveitando aprendizados de empresas similares.',
        features: ['Sessões com sua equipe', 'Aprendizados do setor'],
      },
      {
        title: 'Integramos a Atom à sua stack',
        desc: 'Cuidamos da integração técnica com a WhatsApp Business API, seu CRM e as plataformas que você já usa. Sem desenvolvimento do lado do seu time de TI.',
        features: ['WhatsApp Business API', 'Seu CRM e plataformas'],
      },
      {
        title: 'Você promove seus vendedores a supervisores',
        desc: 'Ativamos seus consultores na plataforma para facilitar o trabalho e mantê-los focados nos fechamentos que realmente importam.',
        features: ['Onboarding de consultores', 'Foco nos fechamentos'],
      },
    ],
  },
  features: {
    responde: {
      stat: '+89%',
      tag: 'IA Transacional da Atom',
      title: 'De leads qualificados pelo WhatsApp, sem aumentar o orçamento.',
      body: 'Promova seus vendedores a supervisores: a IA transacional da Atom atende, converte e vende, mantendo a atenção humana onde importa. Elimina o trabalho manual e repetitivo dos seus agentes.',
    },
    califica: {
      stat: '95%',
      tag: 'Remarketing pelo WhatsApp',
      title: 'Dos leads ainda não estão prontos para comprar.',
      body: 'Mantenha-os interessados e converta quando estiverem prontos com as campanhas de remarketing pelo WhatsApp da Atom. Seu investimento em mídia, aproveitado ao máximo.',
    },
    cierra: {
      stat: '-30%',
      tag: 'Atom para Marketing',
      title: 'De redução no custo de aquisição.',
      body: 'A Atom envia cada venda fechada ao Meta e Google via Conversions API; suas campanhas se otimizam para leads que realmente compram.',
    },
  },
  howItWorks: {
    eyebrow: 'Como funciona',
    lead: 'Sua *IA* que',
    body: 'Uma única IA conversacional que opera seu WhatsApp de ponta a ponta: capta, qualifica e fecha enquanto sua equipe só supervisiona.',
    cta: 'Começar',
    features: [
      'Responde em segundos',
      'Qualifica cada lead',
      'Converte conversas',
      'Registra tudo no seu CRM',
      'Liga pelo WhatsApp',
      'Lança campanhas',
      'Recupera leads frios',
      'Vende por você, 24/7',
    ],
  },
  logos: {
    eyebrow: 'Confiam em nós',
  },
  cac: {
    heading: 'Cada lead perdido aumenta seu CAC.',
    body: 'Fale com um consultor hoje e descubra como a Atom pode transformar o WhatsApp no seu canal de vendas mais poderoso.',
    cta: 'Agendar demo',
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
