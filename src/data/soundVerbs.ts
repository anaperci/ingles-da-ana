// Verbos irregulares agrupados por PADRÃO DE SOM (não por grafia).
// A ideia é ensinar a regra de pronúncia junto com o par presente → passado,
// porque pra quem fala português o problema raramente é a grafia — é o som.
//
// Cada verbo treina as 3 habilidades:
//  - LER:    o par + as 2 frases de exemplo (presente e passado, en + pt)
//  - FALAR:  ler o par e as frases em voz alta (Web Speech API)
//  - ESCREVER: escrever o passado e "virar" a frase do presente pro passado

import type { CEFRLevel } from '@/types'

export interface VerbExample {
  en: string
  pt: string
}

export interface SoundVerb {
  id: string
  base: string
  past: string
  translation: string
  /** chave do grupo de som (casa com verbPronunciationRules.id) */
  soundGroup: string
  /** dica extra específica deste verbo */
  pronunciationTip?: string
  examplePresent: VerbExample
  examplePast: VerbExample
  level: CEFRLevel
}

export interface VerbPronunciationRule {
  id: string
  /** rótulo curto do grupo, ex.: "I = Ê" */
  label: string
  /** a regra explicada */
  rule: string
  /** exemplos de leitura aproximada */
  examples: string[]
}

/** A regra de som de cada grupo — ensinada junto dos verbos. */
export const verbPronunciationRules: VerbPronunciationRule[] = [
  {
    id: 'i-curto',
    label: 'I = Ê',
    rule: "O 'i' dessas palavras é o som curto /ɪ/: soa como o 'ê' do português, nunca como o 'i' de 'vida'.",
    examples: ["sit → 'sêt'", "win → 'uên'", "drink → 'drênk'", "give → 'guêv'"],
  },
  {
    id: 'ought-aught',
    label: "-OUGHT / -AUGHT = 'ót'",
    rule: "O 'GH' é mudo. As terminações -ought e -aught soam 'ót' (ó aberto + t).",
    examples: ["bought → 'bót'", "thought → 'thót'", "taught → 'tót'", "caught → 'cót'"],
  },
  {
    id: 'ow-ew',
    label: "OW = 'ôu' · EW = 'iú'",
    rule: "No presente, 'ow' soa 'ôu'. No passado, 'ew' soa 'iú' (um 'i' esticado emendado no 'u').",
    examples: ["know → 'nôu' / knew → 'niú'", "grow → 'grôu' / grew → 'griú'", "throw → 'thrôu' / threw → 'thriú'"],
  },
  {
    id: 'oo-curto',
    label: "Passado OO = 'u' curto",
    rule: "Esses passados com 'oo' têm o 'u' curto (/ʊ/), não o 'u' longo de 'food'. É um 'u' rápido.",
    examples: ["took → 'tuk'", "stood → 'stud'", "shook → 'xuk'", "understood → 'anderstúd'"],
  },
  {
    id: 'nao-muda',
    label: 'Não muda',
    rule: 'Esses verbos têm presente e passado iguais. O que muda é só o contexto/tempo da frase.',
    examples: ['cut → cut', 'put → put', 'cost → cost', 'let → let'],
  },
]

export const soundVerbs: SoundVerb[] = [
  // ── I = Ê (i curto /ɪ/) ───────────────────────────────────────
  {
    id: 'sv-sit', base: 'sit', past: 'sat', translation: 'sentar', soundGroup: 'i-curto', level: 'A1',
    examplePresent: { en: 'I sit here every day.', pt: 'Eu sento aqui todo dia.' },
    examplePast: { en: 'I sat there yesterday.', pt: 'Eu sentei lá ontem.' },
  },
  {
    id: 'sv-win', base: 'win', past: 'won', translation: 'vencer / ganhar', soundGroup: 'i-curto', level: 'A2',
    pronunciationTip: "'won' (passado) soa 'uân', com som de 'â'.",
    examplePresent: { en: 'We win almost every game.', pt: 'A gente ganha quase todo jogo.' },
    examplePast: { en: 'We won the game.', pt: 'A gente ganhou o jogo.' },
  },
  {
    id: 'sv-give', base: 'give', past: 'gave', translation: 'dar', soundGroup: 'i-curto', level: 'A1',
    examplePresent: { en: 'I give her flowers.', pt: 'Eu dou flores pra ela.' },
    examplePast: { en: 'I gave her flowers.', pt: 'Eu dei flores pra ela.' },
  },
  {
    id: 'sv-begin', base: 'begin', past: 'began', translation: 'começar', soundGroup: 'i-curto', level: 'A2',
    examplePresent: { en: 'We begin at nine.', pt: 'A gente começa às nove.' },
    examplePast: { en: 'We began at nine.', pt: 'A gente começou às nove.' },
  },
  {
    id: 'sv-drink', base: 'drink', past: 'drank', translation: 'beber', soundGroup: 'i-curto', level: 'A1',
    examplePresent: { en: 'I drink coffee every morning.', pt: 'Eu bebo café toda manhã.' },
    examplePast: { en: 'I drank coffee this morning.', pt: 'Eu bebi café hoje de manhã.' },
  },
  {
    id: 'sv-swim', base: 'swim', past: 'swam', translation: 'nadar', soundGroup: 'i-curto', level: 'A2',
    examplePresent: { en: 'I swim on weekends.', pt: 'Eu nado nos fins de semana.' },
    examplePast: { en: 'I swam yesterday.', pt: 'Eu nadei ontem.' },
  },

  // ── -OUGHT / -AUGHT = 'ót' ────────────────────────────────────
  {
    id: 'sv-buy', base: 'buy', past: 'bought', translation: 'comprar', soundGroup: 'ought-aught', level: 'A1',
    examplePresent: { en: 'I buy bread here.', pt: 'Eu compro pão aqui.' },
    examplePast: { en: 'I bought bread here.', pt: 'Eu comprei pão aqui.' },
  },
  {
    id: 'sv-think', base: 'think', past: 'thought', translation: 'pensar / achar', soundGroup: 'ought-aught', level: 'A1',
    examplePresent: { en: 'I think so.', pt: 'Eu acho que sim.' },
    examplePast: { en: 'I thought so.', pt: 'Eu achei que sim.' },
  },
  {
    id: 'sv-bring', base: 'bring', past: 'brought', translation: 'trazer', soundGroup: 'ought-aught', level: 'A2',
    examplePresent: { en: 'I bring my lunch.', pt: 'Eu trago meu almoço.' },
    examplePast: { en: 'I brought my lunch.', pt: 'Eu trouxe meu almoço.' },
  },
  {
    id: 'sv-teach', base: 'teach', past: 'taught', translation: 'ensinar', soundGroup: 'ought-aught', level: 'A2',
    examplePresent: { en: 'I teach English.', pt: 'Eu ensino inglês.' },
    examplePast: { en: 'I taught English.', pt: 'Eu ensinei inglês.' },
  },
  {
    id: 'sv-catch', base: 'catch', past: 'caught', translation: 'pegar / capturar', soundGroup: 'ought-aught', level: 'A2',
    examplePresent: { en: 'I catch the bus at eight.', pt: 'Eu pego o ônibus às oito.' },
    examplePast: { en: 'I caught the bus at eight.', pt: 'Eu peguei o ônibus às oito.' },
  },

  // ── OW = 'ôu' · EW = 'iú' ─────────────────────────────────────
  {
    id: 'sv-know', base: 'know', past: 'knew', translation: 'saber / conhecer', soundGroup: 'ow-ew', level: 'A1',
    pronunciationTip: "O 'k' de 'know/knew' é mudo: 'nôu' / 'niú'.",
    examplePresent: { en: 'I know the answer.', pt: 'Eu sei a resposta.' },
    examplePast: { en: 'I knew the answer.', pt: 'Eu sabia a resposta.' },
  },
  {
    id: 'sv-grow', base: 'grow', past: 'grew', translation: 'crescer', soundGroup: 'ow-ew', level: 'A2',
    examplePresent: { en: 'Plants grow fast here.', pt: 'As plantas crescem rápido aqui.' },
    examplePast: { en: 'The plants grew fast.', pt: 'As plantas cresceram rápido.' },
  },
  {
    id: 'sv-throw', base: 'throw', past: 'threw', translation: 'jogar / arremessar', soundGroup: 'ow-ew', level: 'A2',
    examplePresent: { en: 'I throw the ball.', pt: 'Eu jogo a bola.' },
    examplePast: { en: 'I threw the ball.', pt: 'Eu joguei a bola.' },
  },
  {
    id: 'sv-fly', base: 'fly', past: 'flew', translation: 'voar', soundGroup: 'ow-ew', level: 'A2',
    examplePresent: { en: 'Birds fly south in winter.', pt: 'Os pássaros voam pro sul no inverno.' },
    examplePast: { en: 'The birds flew south.', pt: 'Os pássaros voaram pro sul.' },
  },
  {
    id: 'sv-draw', base: 'draw', past: 'drew', translation: 'desenhar', soundGroup: 'ow-ew', level: 'A2',
    examplePresent: { en: 'I draw every day.', pt: 'Eu desenho todo dia.' },
    examplePast: { en: 'I drew a picture.', pt: 'Eu desenhei um desenho.' },
  },

  // ── Passado OO = 'u' curto ────────────────────────────────────
  {
    id: 'sv-take', base: 'take', past: 'took', translation: 'pegar / levar', soundGroup: 'oo-curto', level: 'A1',
    examplePresent: { en: 'I take the train.', pt: 'Eu pego o trem.' },
    examplePast: { en: 'I took the train.', pt: 'Eu peguei o trem.' },
  },
  {
    id: 'sv-shake', base: 'shake', past: 'shook', translation: 'sacudir / tremer', soundGroup: 'oo-curto', level: 'B1',
    examplePresent: { en: 'We shake hands.', pt: 'A gente aperta as mãos.' },
    examplePast: { en: 'We shook hands.', pt: 'A gente apertou as mãos.' },
  },
  {
    id: 'sv-stand', base: 'stand', past: 'stood', translation: 'ficar de pé', soundGroup: 'oo-curto', level: 'A2',
    examplePresent: { en: 'I stand in line.', pt: 'Eu fico na fila.' },
    examplePast: { en: 'I stood in line.', pt: 'Eu fiquei na fila.' },
  },
  {
    id: 'sv-understand', base: 'understand', past: 'understood', translation: 'entender', soundGroup: 'oo-curto', level: 'A2',
    examplePresent: { en: 'I understand now.', pt: 'Eu entendo agora.' },
    examplePast: { en: 'I understood everything.', pt: 'Eu entendi tudo.' },
  },

  // ── Não muda (presente = passado) ─────────────────────────────
  {
    id: 'sv-cut', base: 'cut', past: 'cut', translation: 'cortar', soundGroup: 'nao-muda', level: 'A1',
    examplePresent: { en: 'I cut the bread.', pt: 'Eu corto o pão.' },
    examplePast: { en: 'I cut the bread yesterday.', pt: 'Eu cortei o pão ontem.' },
  },
  {
    id: 'sv-put', base: 'put', past: 'put', translation: 'colocar / pôr', soundGroup: 'nao-muda', level: 'A1',
    examplePresent: { en: 'I put it here.', pt: 'Eu coloco aqui.' },
    examplePast: { en: 'I put it here earlier.', pt: 'Eu coloquei aqui mais cedo.' },
  },
  {
    id: 'sv-cost', base: 'cost', past: 'cost', translation: 'custar', soundGroup: 'nao-muda', level: 'A2',
    examplePresent: { en: 'It costs ten euros.', pt: 'Custa dez euros.' },
    examplePast: { en: 'It cost ten euros.', pt: 'Custou dez euros.' },
  },
  {
    id: 'sv-let', base: 'let', past: 'let', translation: 'deixar / permitir', soundGroup: 'nao-muda', level: 'A2',
    examplePresent: { en: 'I let him go.', pt: 'Eu deixo ele ir.' },
    examplePast: { en: 'I let him go earlier.', pt: 'Eu deixei ele ir mais cedo.' },
  },
  {
    id: 'sv-shut', base: 'shut', past: 'shut', translation: 'fechar', soundGroup: 'nao-muda', level: 'A2',
    examplePresent: { en: 'I shut the door.', pt: 'Eu fecho a porta.' },
    examplePast: { en: 'I shut the door earlier.', pt: 'Eu fechei a porta mais cedo.' },
  },
]

/** Conceitos/encorajamento do método — exibidos como dicas. */
export const verbMethodTips = [
  'Aprenda o som, não a letra. O segredo dos irregulares é agrupar pelo padrão de pronúncia — aí cinco verbos viram uma regra só.',
  'Fale o par em voz alta: "sit, sat", "give, gave". O ritmo ajuda a fixar mais que escrever dez vezes.',
  'Comece pelos verbos que você já usa todo dia (go, take, get) e vá subindo.',
  'Errar o passado faz parte. Vire a frase do presente pro passado quantas vezes precisar — é assim que gruda.',
]
