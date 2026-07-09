// Três packs de gramática de produção: Condicionais, Tempos verbais e Appropriacy.
// Mesmo espírito dos outros módulos: exemplos EN + PT, dica pra brasileiro,
// e prática de LER / FALAR (voz alta) / ESCREVER (writingPrompt).

// ---------- Tipos ----------
export interface GrammarExample {
  en: string
  pt: string
}

export interface GrammarPoint {
  id: string
  name: string
  structure: string // fórmula
  use: string // quando usar
  ptTip?: string // pegadinha pra falante de português
  examples: GrammarExample[]
  writingPrompt: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

// ---------- 1. CONDICIONAIS ----------
export const conditionals: GrammarPoint[] = [
  {
    id: 'zero-conditional',
    name: 'Zero conditional',
    structure: 'If + presente simples, presente simples',
    use: 'Fatos, verdades gerais, coisas que sempre acontecem.',
    ptTip: "Os dois lados ficam no presente. Nada de 'will' aqui.",
    examples: [
      { en: 'If you heat ice, it melts.', pt: 'Se você esquenta o gelo, ele derrete.' },
      { en: "If I don't sleep, I get tired.", pt: 'Se eu não durmo, eu fico cansado.' },
      { en: 'If it rains, the streets get wet.', pt: 'Se chove, as ruas ficam molhadas.' },
    ],
    writingPrompt:
      "Escreva um fato seu com 'If + presente, presente' (ex.: If I drink coffee at night, I don't sleep).",
    level: 'beginner',
  },
  {
    id: 'first-conditional',
    name: 'First conditional',
    structure: 'If + presente simples, will + verbo',
    use: 'Possibilidade real no futuro — algo que pode mesmo acontecer.',
    ptTip:
      "ERRO clássico de brasileiro: 'If it will rain'. Depois de 'if' vai PRESENTE, o 'will' fica só no outro lado.",
    examples: [
      { en: "If it rains, I'll stay home.", pt: 'Se chover, eu fico em casa.' },
      { en: "If you study, you'll pass.", pt: 'Se você estudar, você vai passar.' },
      { en: "If she calls, I'll tell her.", pt: 'Se ela ligar, eu conto pra ela.' },
    ],
    writingPrompt: "Escreva um plano condicional com 'If + presente, will + verbo'.",
    level: 'beginner',
  },
  {
    id: 'second-conditional',
    name: 'Second conditional',
    structure: 'If + passado simples, would + verbo',
    use: 'Situação hipotética ou improvável no presente/futuro (imaginação, sonho).',
    ptTip:
      "Depois de 'if' vai PASSADO (mesmo falando do agora imaginário). O 'would' nunca vai depois de 'if'.",
    examples: [
      { en: 'If I had more time, I would travel.', pt: 'Se eu tivesse mais tempo, eu viajaria.' },
      { en: 'If I were you, I would rest.', pt: 'Se eu fosse você, eu descansaria.' },
      {
        en: 'If I won the lottery, I would buy a house.',
        pt: 'Se eu ganhasse na loteria, eu compraria uma casa.',
      },
    ],
    writingPrompt: "Escreva um desejo hipotético com 'If + passado, would + verbo'.",
    level: 'intermediate',
  },
  {
    id: 'third-conditional',
    name: 'Third conditional',
    structure: 'If + past perfect (had + particípio), would have + particípio',
    use: 'Passado que NÃO aconteceu — arrependimento ou situação imaginária no passado.',
    ptTip:
      "É o 'se eu tivesse... eu teria...'. Dois blocos: 'had + particípio' de um lado, 'would have + particípio' do outro.",
    examples: [
      { en: 'If I had known, I would have told you.', pt: 'Se eu tivesse sabido, eu teria te contado.' },
      { en: 'If she had studied, she would have passed.', pt: 'Se ela tivesse estudado, teria passado.' },
      {
        en: "If we had left earlier, we wouldn't have missed it.",
        pt: 'Se tivéssemos saído mais cedo, não teríamos perdido.',
      },
    ],
    writingPrompt:
      "Escreva um arrependimento com 'If + had + particípio, would have + particípio'.",
    level: 'advanced',
  },
]

// ---------- 2. TEMPOS VERBAIS ----------
export const verbTenses: GrammarPoint[] = [
  {
    id: 'present-simple',
    name: 'Present simple',
    structure: 'sujeito + verbo (he/she/it + -s)',
    use: 'Rotina, hábitos, fatos, coisas que são sempre verdade.',
    ptTip: 'Não esqueça o -s na 3ª pessoa: he workS, she likeS. É o erro nº 1.',
    examples: [
      { en: 'I work in tech.', pt: 'Eu trabalho com tecnologia.' },
      { en: 'She works from home.', pt: 'Ela trabalha de casa.' },
      { en: 'We drink coffee every morning.', pt: 'A gente toma café toda manhã.' },
    ],
    writingPrompt: 'Escreva uma rotina sua (ex.: I wake up at 7).',
    level: 'beginner',
  },
  {
    id: 'present-continuous',
    name: 'Present continuous',
    structure: 'am / is / are + verbo-ing',
    use: 'Algo acontecendo agora, neste momento, ou temporário.',
    ptTip: "Precisa do am/is/are + -ing. 'I working' (sem o am) é erro comum.",
    examples: [
      { en: "I'm working right now.", pt: 'Estou trabalhando agora.' },
      { en: "She's studying for a test.", pt: 'Ela está estudando pra uma prova.' },
      { en: "They're traveling this week.", pt: 'Eles estão viajando esta semana.' },
    ],
    writingPrompt: "Escreva o que você está fazendo agora (I'm ...-ing).",
    level: 'beginner',
  },
  {
    id: 'present-perfect',
    name: 'Present perfect',
    structure: 'have / has + particípio',
    use: 'Experiência de vida, ou passado que ainda tem ligação com o presente (com for/since, already, yet, ever).',
    ptTip:
      "Brasileiro confunde com passado simples. Use quando NÃO importa QUANDO exatamente: 'I have been to London' (já fui, alguma vez). Com tempo definido, use past simple.",
    examples: [
      { en: 'I have worked here for five years.', pt: 'Trabalho aqui há cinco anos.' },
      { en: 'Have you ever been to Malta?', pt: 'Você já foi a Malta alguma vez?' },
      { en: "She hasn't finished yet.", pt: 'Ela ainda não terminou.' },
    ],
    writingPrompt: "Escreva uma experiência com 'I have + particípio' (ex.: I have visited Rome).",
    level: 'intermediate',
  },
  {
    id: 'past-simple',
    name: 'Past simple',
    structure: 'verbo no passado (regular -ed / irregular)',
    use: 'Ação concluída num momento definido do passado.',
    ptTip:
      'Com marcador de tempo (yesterday, last week, in 2020) é sempre past simple, não present perfect.',
    examples: [
      { en: 'I worked yesterday.', pt: 'Eu trabalhei ontem.' },
      { en: 'We went to the beach last week.', pt: 'A gente foi à praia semana passada.' },
      { en: 'She wrote three emails.', pt: 'Ela escreveu três e-mails.' },
    ],
    writingPrompt: 'Escreva algo que você fez ontem (use um verbo no passado).',
    level: 'beginner',
  },
  {
    id: 'past-continuous',
    name: 'Past continuous',
    structure: 'was / were + verbo-ing',
    use: 'Ação em progresso no passado, muitas vezes interrompida por outra.',
    ptTip:
      'Combina com o past simple: a ação longa fica no -ing, a curta que interrompe fica no passado simples.',
    examples: [
      { en: 'I was working when she called.', pt: 'Eu estava trabalhando quando ela ligou.' },
      { en: 'They were sleeping at 10 pm.', pt: 'Eles estavam dormindo às 22h.' },
      { en: 'What were you doing yesterday?', pt: 'O que você estava fazendo ontem?' },
    ],
    writingPrompt: "Escreva 'I was ...-ing when ...' (uma ação interrompida por outra).",
    level: 'intermediate',
  },
  {
    id: 'past-perfect',
    name: 'Past perfect',
    structure: 'had + particípio',
    use: "O 'passado do passado' — algo que aconteceu ANTES de outra coisa no passado.",
    ptTip: "É o 'tinha feito'. Serve pra deixar claro qual das duas coisas veio primeiro.",
    examples: [
      { en: 'I had left when she arrived.', pt: 'Eu já tinha saído quando ela chegou.' },
      { en: 'They had eaten before the movie.', pt: 'Eles tinham comido antes do filme.' },
      { en: 'She had never seen snow before.', pt: 'Ela nunca tinha visto neve antes.' },
    ],
    writingPrompt: "Escreva 'I had + particípio' + before/when + outra coisa no passado.",
    level: 'advanced',
  },
  {
    id: 'future-will',
    name: 'Future — will',
    structure: 'will + verbo',
    use: 'Decisão na hora, promessa, previsão, oferta de ajuda.',
    ptTip:
      "'will' é pra decisão espontânea ('I'll help you') e previsão. Pra plano já pensado, use 'going to'.",
    examples: [
      { en: "I'll help you.", pt: 'Eu te ajudo.' },
      { en: 'It will rain tomorrow.', pt: 'Vai chover amanhã.' },
      { en: "I think she'll like it.", pt: 'Acho que ela vai gostar.' },
    ],
    writingPrompt: "Ofereça ajuda ou faça uma previsão com 'will'.",
    level: 'beginner',
  },
  {
    id: 'future-going-to',
    name: 'Future — going to',
    structure: 'am / is / are + going to + verbo',
    use: 'Plano ou intenção já decidida; ou previsão com evidência clara.',
    ptTip:
      "Plano combinado = 'going to'. 'I'm going to travel next month' (já decidi). Compare com 'will' (decisão na hora).",
    examples: [
      { en: "I'm going to travel next month.", pt: 'Eu vou viajar mês que vem.' },
      { en: "We're going to start a business.", pt: 'A gente vai abrir um negócio.' },
      { en: "Look at those clouds — it's going to rain.", pt: 'Olha essas nuvens — vai chover.' },
    ],
    writingPrompt: "Escreva um plano seu com 'I'm going to + verbo'.",
    level: 'beginner',
  },
]

// ---------- 3. APPROPRIACY (registro: casual / neutro / formal) ----------
export interface RegisterLevel {
  register: 'Casual' | 'Neutral' | 'Formal'
  en: string
  pt: string
  when: string // quando usar
}

export interface RegisterSet {
  id: string
  situation: string // o que você quer fazer
  note?: string
  levels: RegisterLevel[]
}

export const appropriacy: RegisterSet[] = [
  {
    id: 'asking-for-something',
    situation: 'Pedir algo',
    note: 'Mesmo pedido, três níveis de educação. O contexto decide.',
    levels: [
      { register: 'Casual', en: 'Can I get a coffee?', pt: 'Me vê um café?', when: 'Com amigos, lugares informais.' },
      {
        register: 'Neutral',
        en: 'Could I have a coffee, please?',
        pt: 'Eu poderia tomar um café, por favor?',
        when: 'Padrão seguro pra quase tudo.',
      },
      {
        register: 'Formal',
        en: 'Would it be possible to have a coffee?',
        pt: 'Seria possível tomar um café?',
        when: 'Situações formais, com desconhecidos.',
      },
    ],
  },
  {
    id: 'asking-permission',
    situation: 'Pedir permissão',
    levels: [
      { register: 'Casual', en: 'Can I sit here?', pt: 'Posso sentar aqui?', when: 'Informal, do dia a dia.' },
      { register: 'Neutral', en: 'May I sit here?', pt: 'Posso me sentar aqui?', when: 'Educado e versátil.' },
      {
        register: 'Formal',
        en: 'Would you mind if I sat here?',
        pt: 'Você se importaria se eu sentasse aqui?',
        when: "Bem educado; note o passado 'sat'.",
      },
    ],
  },
  {
    id: 'disagreeing',
    situation: 'Discordar',
    levels: [
      {
        register: 'Casual',
        en: "No way, I don't think so.",
        pt: 'De jeito nenhum, acho que não.',
        when: 'Com gente próxima.',
      },
      { register: 'Neutral', en: "I'm not sure I agree.", pt: 'Não sei se concordo.', when: 'Suaviza sem ser rude.' },
      {
        register: 'Formal',
        en: "I see your point, but I'd respectfully disagree.",
        pt: 'Entendo seu ponto, mas discordo, com respeito.',
        when: 'Reunião, contexto profissional.',
      },
    ],
  },
  {
    id: 'apologizing',
    situation: 'Pedir desculpa',
    levels: [
      { register: 'Casual', en: 'My bad, sorry!', pt: 'Foi mal, desculpa!', when: 'Erro pequeno, entre amigos.' },
      { register: 'Neutral', en: "I'm sorry about that.", pt: 'Desculpa por isso.', when: 'Padrão pra maioria dos casos.' },
      {
        register: 'Formal',
        en: 'I sincerely apologize for the inconvenience.',
        pt: 'Peço sinceras desculpas pelo transtorno.',
        when: 'E-mail profissional, cliente.',
      },
    ],
  },
  {
    id: 'greeting-opening',
    situation: 'Cumprimentar / abrir conversa',
    levels: [
      { register: 'Casual', en: "Hey, what's up?", pt: 'E aí, tudo bem?', when: 'Amigos, colegas próximos.' },
      { register: 'Neutral', en: 'Hi, how are you?', pt: 'Oi, como vai?', when: 'Quase qualquer situação.' },
      {
        register: 'Formal',
        en: "Good morning. I hope you're well.",
        pt: 'Bom dia. Espero que esteja bem.',
        when: 'Abertura formal, e-mail de trabalho.',
      },
    ],
  },
  {
    id: 'closing-email',
    situation: 'Encerrar e-mail / conversa',
    levels: [
      { register: 'Casual', en: 'Talk soon!', pt: 'Falo com você em breve!', when: 'Mensagem informal.' },
      { register: 'Neutral', en: 'Thanks! Best,', pt: 'Obrigada! Abraços,', when: 'E-mail cordial do dia a dia.' },
      {
        register: 'Formal',
        en: 'Kind regards. I look forward to hearing from you.',
        pt: 'Atenciosamente. Fico no aguardo do seu retorno.',
        when: 'E-mail profissional formal.',
      },
    ],
  },
]
