// Copy em português (pt-BR). Estrutura idêntica a es.ts; só muda o texto.
// **…** marca palavras a destacar (peso tipográfico) para reforçar a narrativa.

import type { SectionContent } from './types';
import { WAITLIST, CTA_BG_VIDEO, ENGINE_IMG } from './shared';

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
    theme: 'light',
    eyebrow: 'A tese',
    heading: 'Tudo o que você precisa para operar o WhatsApp como um canal de vendas',
    paragraphs: [],
  },
  {
    kind: 'cards',
    id: 'aa-programa',
    theme: 'light',
    heading: '',
    layout: 'slider',
    cards: [
      {
        variant: 'mint',
        title: 'IA Transacional no WhatsApp',
        desc: 'Uma IA que gerencia suas conversas de WhatsApp de ponta a ponta, para que seus vendedores só intervenham quando necessário.',
      },
      {
        variant: 'lavender',
        title: 'Remarketing inteligente',
        desc: 'Com mensagens e ligações de acompanhamento, a Atom recupera leads que não compram no primeiro contato e os mantém interessados até estarem prontos para avançar.',
      },
      {
        variant: 'peach',
        title: 'Atendimento com especialistas',
        desc: 'Nossa equipe de especialistas no seu setor acompanha a implementação da IA na sua operação e capacita você para alcançar autonomia.',
      },
      {
        variant: 'sky',
        title: 'Do clique no anúncio à venda, tudo é visível',
        desc: 'O único sistema que converte, recupera e rastreia cada lead, do Meta, Google ou TikTok até o fechamento no seu CRM.',
      },
      {
        variant: 'mint',
        title: 'Mais conversões, menos custo',
        desc: 'Com a integração com a Conversions API, aumente os leads qualificados e reduza em até 30% seus custos com anúncios.',
      },
    ],
  },
  {
    kind: 'tabs',
    id: 'aa-vision',
    theme: 'light',
    eyebrow: 'O motor de IA da Atom',
    heading: 'Um *motor de IA* feito para acelerar seus processos',
    tabs: [
      {
        label: 'Resumo da conversa',
        heading: 'Resumo da conversa',
        paragraphs: [
          'Enquanto outros bots apenas guardam o histórico, a IA da Atom lê cada conversa e entrega um resumo claro: o que o lead quer, em que etapa está e qual é o próximo passo.',
          'Sua equipe retoma qualquer chat em segundos, sem ler centenas de mensagens nem perder o contexto.',
        ],
        image: { src: ENGINE_IMG.summary, alt: 'Consultor revisando o resumo de uma conversa' },
      },
      {
        label: 'Sugestões inteligentes',
        heading: 'Sugestões inteligentes',
        paragraphs: [
          'A Atom não se limita a respostas prontas: sugere a próxima mensagem ideal conforme o contexto real da conversa e sua estratégia de vendas.',
          'Seus consultores respondem melhor e mais rápido, com a consistência de um especialista em cada chat.',
        ],
        image: { src: ENGINE_IMG.suggestions, alt: 'Profissional recebendo sugestões inteligentes da IA' },
      },
      {
        label: 'Priorização de conversas',
        heading: 'Priorização de conversas',
        paragraphs: [
          'Em vez de uma caixa de entrada infinita por ordem de chegada, a IA da Atom detecta a intenção de compra e prioriza os leads quentes primeiro.',
          'Sua equipe dedica o tempo às conversas que realmente fecham vendas.',
        ],
        image: { src: ENGINE_IMG.priority, alt: 'Equipe priorizando as conversas mais importantes' },
      },
      {
        label: 'Chamadas de WhatsApp com IA',
        heading: 'Chamadas de WhatsApp com IA',
        paragraphs: [
          'A Atom vai além do texto: realiza e assiste chamadas de WhatsApp com IA para tirar dúvidas, agendar e fechar sem fricção.',
          'Uma camada de voz que nenhum chatbot tradicional oferece, integrada no mesmo canal.',
        ],
        image: { src: ENGINE_IMG.calls, alt: 'Profissional em uma chamada de WhatsApp assistida por IA' },
      },
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
    kind: 'reviews',
    id: 'aa-reviews',
    theme: 'light',
    eyebrow: 'Avaliações',
    heading: 'Times comerciais reais. Resultados mensuráveis.',
    subheading: 'O que dizem os times que já operam o WhatsApp com a Atom.',
    reviews: [
      {
        quote: 'Conseguimos automatizar todo o nosso processo de vendas no WhatsApp.',
        name: 'Reyna P.',
        role: 'Gerente de Operações',
        rating: 5,
      },
      {
        quote: 'A Atom nos dá uma vantagem competitiva forte e profissional.',
        name: 'Carlos M.',
        role: 'Líder de Atendimento',
        rating: 5,
      },
      {
        quote: 'A facilidade de segmentar os clientes pelo motivo do contato.',
        name: 'Hamit A.',
        role: 'Logística e Transporte',
        rating: 5,
      },
      {
        quote: 'A integração com Facebook e WhatsApp foi, de longe, meu recurso favorito.',
        name: 'Frederick G.',
        role: 'Diretor Executivo',
        rating: 4,
      },
      {
        quote: 'É intuitivo e parece muito produtivo desde o primeiro dia.',
        name: 'Laura S.',
        role: 'Gerente de Benefícios',
        rating: 4,
      },
      {
        quote: 'Toda a funcionalidade que você precisa, numa interface limpa.',
        name: 'Sean D.',
        role: 'Assistente de Marketing',
        rating: 5,
      },
      {
        quote: 'Como é fluido de usar, com uma interface muito amigável.',
        name: 'Nteziyaremye I.',
        role: 'Tecnologia da Informação',
        rating: 4,
      },
      {
        quote: 'Ficamos impressionados com os recursos e o desempenho.',
        name: 'Chris C.',
        role: 'Diretor de TI',
        rating: 4,
      },
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
