// Parts of speech (classes gramaticais) — a função de cada tipo de palavra na frase.
// Foco nas diferenças que confundem falante de português.
// Serve para LER, FALAR (voz alta) e ESCREVER (writingPrompt).

export interface PosSentence {
  en: string
  pt: string
}

export interface PartOfSpeech {
  id: string
  name: string // "Noun"
  namePt: string // "Substantivo"
  function: string // o que faz
  examples: string[] // palavras de exemplo
  ptTip?: string // pegadinha pra brasileiro
  sentences: PosSentence[]
  writingPrompt: string
}

export const partsOfSpeech: PartOfSpeech[] = [
  {
    id: 'noun',
    name: 'Noun',
    namePt: 'Substantivo',
    function: 'Nomeia pessoa, lugar, coisa, animal ou ideia.',
    examples: ['teacher', 'city', 'book', 'dog', 'love', 'Malta'],
    ptTip:
      "Podem ser contáveis (a book, two books) ou incontáveis (water, information — sem plural nem 'a').",
    sentences: [
      { en: 'The teacher lives in Malta.', pt: 'A professora mora em Malta.' },
      { en: 'I need information and water.', pt: 'Preciso de informação e água.' },
    ],
    writingPrompt: 'Escreva uma frase e identifique o substantivo (a coisa/pessoa da frase).',
  },
  {
    id: 'pronoun',
    name: 'Pronoun',
    namePt: 'Pronome',
    function: 'Substitui um substantivo pra não repetir (I, you, he, she, it, we, they, this, that).',
    examples: ['I / me', 'he / him', 'she / her', 'they / them', 'this', 'that'],
    ptTip:
      "Cuidado sujeito x objeto: 'I' faz a ação, 'me' recebe. É 'between you and me', não 'you and I'.",
    sentences: [
      { en: 'She is my friend. I like her.', pt: 'Ela é minha amiga. Eu gosto dela.' },
      { en: 'They called us yesterday.', pt: 'Eles nos ligaram ontem.' },
    ],
    writingPrompt: 'Escreva duas frases: na segunda, troque o nome por um pronome (ex.: Ana → she).',
  },
  {
    id: 'verb',
    name: 'Verb',
    namePt: 'Verbo',
    function: 'Indica uma ação ou um estado.',
    examples: ['run', 'think', 'work', 'be (am/is/are)', 'have'],
    ptTip: "Não esqueça o verbo 'to be': 'I am tired' (não 'I tired'). Em inglês o verbo quase nunca some.",
    sentences: [
      { en: 'I work and I study.', pt: 'Eu trabalho e eu estudo.' },
      { en: 'She is happy today.', pt: 'Ela está feliz hoje.' },
    ],
    writingPrompt: 'Escreva uma frase de ação e uma de estado (com to be).',
  },
  {
    id: 'adjective',
    name: 'Adjective',
    namePt: 'Adjetivo',
    function: 'Descreve/qualifica um substantivo.',
    examples: ['big', 'red', 'happy', 'expensive', 'beautiful'],
    ptTip:
      "GRANDE diferença: em inglês o adjetivo vem ANTES do substantivo (a red car, não 'a car red') e NÃO muda no plural nem no gênero (two red cars, não 'two reds cars').",
    sentences: [
      { en: 'She has a red car.', pt: 'Ela tem um carro vermelho.' },
      { en: 'They are two expensive books.', pt: 'São dois livros caros.' },
    ],
    writingPrompt:
      'Escreva \'a/an + adjetivo + substantivo\' (ex.: a beautiful city) — adjetivo sempre antes.',
  },
  {
    id: 'adverb',
    name: 'Adverb',
    namePt: 'Advérbio',
    function: 'Descreve um verbo, um adjetivo ou outro advérbio (como, quando, quanto).',
    examples: ['quickly', 'slowly', 'always', 'very', 'well'],
    ptTip:
      "Muitos terminam em -ly (quick → quickly). Atenção: 'good' é adjetivo, 'well' é advérbio ('She sings well', não 'sings good').",
    sentences: [
      { en: 'She speaks English very well.', pt: 'Ela fala inglês muito bem.' },
      { en: 'He always arrives early.', pt: 'Ele sempre chega cedo.' },
    ],
    writingPrompt: 'Escreva uma frase com um advérbio em -ly (ex.: I speak slowly).',
  },
  {
    id: 'preposition',
    name: 'Preposition',
    namePt: 'Preposição',
    function: 'Situa no tempo, lugar ou direção, e liga palavras (in, on, at, to, for, with, from).',
    examples: ['in', 'on', 'at', 'to', 'for', 'with', 'from'],
    ptTip:
      'NÃO traduza direto — é combinação: depend ON, interested IN, good AT, married TO. Precisa decorar a dupla verbo/adjetivo + preposição.',
    sentences: [
      { en: 'I work at home on Mondays.', pt: 'Eu trabalho em casa às segundas.' },
      { en: 'She is interested in music.', pt: 'Ela tem interesse em música.' },
    ],
    writingPrompt: 'Escreva uma frase com in, on OU at (lugar ou tempo).',
  },
  {
    id: 'conjunction',
    name: 'Conjunction',
    namePt: 'Conjunção',
    function: 'Liga palavras, frases ou ideias (and, but, or, because, so, although).',
    examples: ['and', 'but', 'or', 'because', 'so', 'although'],
    ptTip: "Usar conjunções liga suas frases curtas e faz você soar mais fluente, menos 'robótico'.",
    sentences: [
      { en: "I'm tired, but I'll go.", pt: 'Estou cansada, mas vou.' },
      { en: 'She stayed home because it was raining.', pt: 'Ela ficou em casa porque estava chovendo.' },
    ],
    writingPrompt: "Junte duas frases curtas com 'and', 'but' ou 'because'.",
  },
  {
    id: 'article',
    name: 'Article',
    namePt: 'Artigo',
    function: 'Vem antes do substantivo: a/an (um/uma, indefinido) e the (o/a, definido).',
    examples: ['a', 'an', 'the'],
    ptTip:
      "'an' antes de SOM de vogal (an apple, an hour). E não use artigo com possessivo ('my car', não 'the my car') nem com idiomas ('I speak English', não 'the English').",
    sentences: [
      { en: 'I saw a dog and an owl.', pt: 'Eu vi um cachorro e uma coruja.' },
      { en: 'The book on the table is mine.', pt: 'O livro na mesa é meu.' },
    ],
    writingPrompt: "Escreva uma frase com 'a' ou 'an' e uma com 'the'.",
  },
  {
    id: 'interjection',
    name: 'Interjection',
    namePt: 'Interjeição',
    function: 'Expressa emoção ou reação, geralmente sozinha (wow, oh, ouch, hey).',
    examples: ['wow', 'oh', 'ouch', 'hey', 'oops'],
    ptTip: 'São curtas e naturais na fala do dia a dia — ajudam a soar menos formal.',
    sentences: [
      { en: "Wow, that's amazing!", pt: 'Uau, que incrível!' },
      { en: 'Oops, I forgot my keys.', pt: 'Ops, esqueci minhas chaves.' },
    ],
    writingPrompt: 'Escreva uma reação sua começando com uma interjeição (Wow, Oh, Oops...).',
  },
]
