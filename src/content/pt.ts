// Copy em português (pt-BR). Estrutura idêntica a es.ts; só muda o texto.
// **…** marca palavras a destacar (peso tipográfico) para reforçar a narrativa.

import type { SectionContent } from './types';
import { WAITLIST, CTA_BG_VIDEO, PROBLEMA_IMG, VISION_IMG } from './shared';

export const pt: SectionContent[] = [
  {
    kind: 'manifesto',
    theme: 'light',
    eyebrow: 'A virada',
    heading: 'Por que se tornar um WhatsApp Marketer?',
    paragraphs: [
      'Porque o marketing mudou. Antes, o desafio era gerar tráfego. Depois, foi gerar leads. Hoje, o verdadeiro desafio é **converter conversas**.',
      'Os usuários não querem mais preencher formulários e esperar. Querem **escrever, receber resposta imediata** e avançar pelo WhatsApp.',
      'Mas para que isso funcione, não basta “ter WhatsApp”. **É preciso estratégia.**',
      'Um **WhatsApp Marketer** entende como transformar esse canal em uma **máquina de crescimento**: conecta anúncios, mensagens, automação, IA, CRM, dados e vendas em uma experiência que **realmente converte**.',
    ],
    bubbles: [
      { kind: 'in', text: 'Isso funciona se eu vendo por DM?', time: '11:58' },
      { kind: 'out', text: 'Quanto custa?', time: '11:59' },
      { kind: 'in', text: 'Preciso entender de tecnologia?', time: '11:59' },
      { kind: 'in', text: 'Em quanto tempo vejo resultados?', time: '12:00' },
      { kind: 'out', text: 'Funciona para a minha loja?', time: '12:00' },
      { kind: 'in', text: 'E se eu não entendo de marketing?', time: '12:01' },
      { kind: 'in', text: 'Dá certificado?', time: '12:01' },
      { kind: 'out', text: 'Serve para agências?', time: '12:02' },
      { kind: 'in', text: 'Inclui templates?', time: '12:02' },
      { kind: 'in', text: 'Ainda tem vaga?', time: '12:03' },
    ],
  },
  {
    kind: 'statement',
    id: 'aa-tesis',
    theme: 'dark',
    eyebrow: 'A tese',
    heading: 'WhatsApp Marketing não é enviar mensagens. É desenhar conversas que vendem.',
    rotate: {
      before: 'WhatsApp Marketing não é enviar mensagens. É desenhar conversas que',
      words: ['vendem', 'convertem', 'fecham', 'fidelizam', 'escalam'],
      after: '.',
    },
    paragraphs: [
      'Nesta formação você vai aprender a pensar o WhatsApp como um canal estratégico dentro do funil comercial. Do primeiro clique em uma campanha até a qualificação do lead, o acompanhamento, a recuperação de oportunidades inativas e a medição real de resultados.',
      'Porque cada conversa pode ser uma venda. Mas só se for desenhada para avançar.',
    ],
  },
  {
    kind: 'checklist',
    id: 'aa-problema',
    theme: 'dark',
    eyebrow: 'O problema',
    heading: 'De lead perdido a oportunidade convertida',
    media: {
      side: 'left',
      src: PROBLEMA_IMG,
      alt: '',
      chat: [
        { kind: 'in', text: 'Oi, tenho interesse 🙌', time: '18:40' },
        { kind: 'in', text: 'Me passam o preço?', time: '18:41' },
        { kind: 'in', text: 'Olá? Ainda estão aí?', time: '19:55' },
        { kind: 'in', text: 'Continuo esperando 😐', time: '20:48' },
        { kind: 'in', text: 'Tá, vou procurar outra opção', time: '21:30' },
        { kind: 'in', text: 'Obrigado mesmo assim 👋', time: '21:31' },
      ],
    },
    intro: [
      'A maioria das empresas investe em gerar demanda, mas perde oportunidades quando o lead chega ao WhatsApp.',
    ],
    marker: 'dot',
    items: [
      'Respostas lentas.',
      'Mensagens sem contexto.',
      'Atendentes sobrecarregados.',
      'Falta de acompanhamento.',
      'Dados que não voltam para as campanhas.',
      'Leads interessados que nunca chegam às vendas.',
    ],
    outro: [
      'O WhatsApp Marketing existe para resolver esse problema.',
      'Não se trata de gerar mais conversas. Trata-se de converter melhor as conversas que você já está gerando.',
    ],
  },
  {
    kind: 'prose',
    id: 'aa-vision',
    theme: 'dark',
    eyebrow: 'A visão',
    heading: 'O novo papel que as empresas vão precisar',
    surface: { color: '#25d366', text: 'dark' },
    media: {
      side: 'right',
      src: VISION_IMG,
      alt: '',
      chat: [
        { kind: 'in', text: 'Oi, vi o anúncio de vocês 👀', time: '12:01' },
        { kind: 'out', text: 'Oi! 👋 Quer que eu conte como funciona?', time: '12:01' },
        { kind: 'in', text: 'Sim, por favor', time: '12:02' },
        { kind: 'out', text: 'Conectamos seu anúncio → WhatsApp → fechamento', time: '12:02' },
        { kind: 'in', text: 'E se eu não responder a tempo?', time: '12:03' },
        { kind: 'out', text: 'A IA responde na hora e te avisa ⚡', time: '12:03' },
        { kind: 'in', text: 'Tenho interesse 🔥 preço?', time: '12:05' },
        { kind: 'out', text: 'Hoje com vaga de lançamento: 30% off', time: '12:05' },
        { kind: 'in', text: 'Quero 🙌', time: '12:06' },
        { kind: 'out', text: 'Te envio o link para agendar 📅', time: '12:06' },
        { kind: 'in', text: 'Agendado! ✅', time: '12:08' },
      ],
    },
    paragraphs: [
      'As empresas já têm especialistas em mídia paga. Especialistas em CRM. Especialistas em automação. Especialistas em vendas.',
      'Mas entre o clique e a venda existe uma zona crítica: a conversa. É aí que nasce o papel do WhatsApp Marketer.',
      'Uma pessoa capaz de entender a estratégia, desenhar a experiência, otimizar as mensagens, ler os dados e transformar o WhatsApp em um canal de crescimento.',
      'Não se trata apenas de responder mais rápido. Trata-se de vender melhor.',
    ],
  },
  {
    kind: 'info',
    theme: 'light',
    scribble: 'O que faz?',
    heading:
      'Um Especialista em WhatsApp Marketing transforma conversas em crescimento: desenha a experiência, otimiza as mensagens e conecta cada chat à estratégia comercial.',
    rotate: {
      before: 'Um Especialista em WhatsApp Marketing transforma conversas em crescimento:',
      words: [
        'desenha a experiência',
        'otimiza as mensagens',
        'conecta cada chat à estratégia comercial',
      ],
      block: true,
    },
    items: [
      {
        title: 'Desenha a conversa',
        desc: 'Cria jornadas conversacionais e mensagens que qualificam, educam e convertem, levando o lead do primeiro clique até a venda sem fricção.',
      },
      {
        title: 'Otimiza a captação',
        desc: 'Lança e ajusta campanhas Click to WhatsApp para que cada anúncio termine em uma conversa real, sem perder leads no caminho.',
      },
      {
        title: 'Integra dados e IA',
        desc: 'Conecta o WhatsApp com o CRM, a automação e a IA para medir a conversão real e recuperar os leads que pararam de responder.',
      },
      {
        title: 'Alinha marketing e vendas',
        desc: 'Faz com que as duas equipes trabalhem no mesmo canal, com mais contexto e melhores resultados.',
      },
    ],
  },
  {
    kind: 'cards',
    id: 'aa-programa',
    theme: 'dark',
    eyebrow: 'Programa',
    heading: 'O que você vai aprender',
    layout: 'slider',
    cards: [
      {
        variant: 'dark',
        tag: 'Base',
        title: 'Fundamentos',
        desc: 'Por que o WhatsApp é hoje um dos canais-chave de marketing e vendas na América Latina.',
      },
      {
        variant: 'electric',
        tag: 'Estratégia',
        title: 'Estratégia conversacional',
        desc: 'Jornadas, fluxos e mensagens que levam o lead do interesse à compra.',
      },
      {
        variant: 'purple',
        tag: 'Captação',
        title: 'Click to WhatsApp',
        desc: 'Campanhas que levam o usuário direto ao WhatsApp sem perder leads após a primeira mensagem.',
      },
      {
        variant: 'neutral',
        tag: 'IA',
        title: 'Automação e IA',
        desc: 'IA para responder, qualificar, agendar e recuperar leads sem perder personalização.',
      },
      {
        variant: 'dark',
        tag: 'Dados',
        title: 'Rastreabilidade e dados',
        desc: 'Meça o que acontece dentro do WhatsApp e conecte com seu CRM para otimizar campanhas.',
      },
      {
        variant: 'electric',
        tag: 'Conversão',
        title: 'Otimização comercial',
        desc: 'Melhore os tempos de resposta, priorize leads e recupere oportunidades inativas.',
      },
    ],
  },
  {
    kind: 'audience',
    id: 'aa-audience',
    theme: 'light',
    eyebrow: 'Para quem',
    heading: 'Esta formação é para você se…',
    intro:
      'O WhatsApp Marketing é para quem vive entre o marketing e a venda, e quer converter melhor cada conversa.',
    items: [
      'Você trabalha com marketing, vendas, growth, performance, CRM, lifecycle, customer experience ou revenue.',
      'Você gerencia campanhas que levam leads ao WhatsApp.',
      'Você quer reduzir a perda de oportunidades depois do clique.',
      'Você precisa melhorar a conversão entre lead, conversa e venda.',
      'Você busca integrar o WhatsApp com IA, automação, CRM e dados.',
      'Você quer desenvolver uma habilidade cada vez mais importante para as equipes comerciais modernas.',
    ],
  },
  {
    kind: 'prose',
    id: 'aa-generacion',
    theme: 'light',
    eyebrow: 'Primeira geração · Julho 2026',
    heading: 'Faça parte da primeira geração de Especialistas em WhatsApp Marketing',
    paragraphs: [
      'A primeira edição é lançada em julho com acesso prioritário para a lista de espera. Cadastre-se, conheça o programa completo e garanta seu lugar antes da abertura geral.',
    ],
    faq: [
      { q: 'Quando a formação é lançada?', a: 'A formação é lançada em julho.' },
      {
        q: 'Quem poderá acessar primeiro?',
        a: 'Nesta primeira edição, o acesso será priorizado para as pessoas cadastradas na lista de espera.',
      },
      {
        q: 'Preciso de experiência prévia com WhatsApp Business?',
        a: 'Não necessariamente. A formação foi pensada para profissionais de marketing, vendas, growth, CRM, performance e experiência do cliente que queiram aprender a usar o WhatsApp como canal estratégico de conversão.',
      },
      {
        q: 'A formação é só para equipes técnicas?',
        a: 'Não. Foi desenhada para perfis de negócio que precisam entender estratégia, automação, IA, dados e conversão sem depender exclusivamente de conhecimentos técnicos.',
      },
      {
        q: 'O que vou conquistar ao finalizar?',
        a: 'Você vai entender como desenhar, implementar e otimizar estratégias de WhatsApp Marketing para captar, qualificar, recuperar e converter leads com mais eficiência.',
      },
    ],
    cta: { label: 'Quero entrar na lista de espera', href: WAITLIST },
  },
  {
    kind: 'cta',
    theme: 'dark',
    heading: 'O futuro do marketing não termina no clique. Começa na conversa.',
    paragraphs: [
      'Cadastre-se na lista de espera e faça parte da primeira formação para se tornar Especialista em WhatsApp Marketing.',
    ],
    cta: { label: 'Entrar na lista de espera', href: WAITLIST },
    bgVideo: CTA_BG_VIDEO,
  },
];
