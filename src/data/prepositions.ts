import type { GrammarCategory, GrammarExercise } from './grammarTypes'

export const PREPOSITION_CATEGORIES: GrammarCategory[] = [
  { key: 'time', label: 'Tempo (in/on/at)' },
  { key: 'place', label: 'Lugar (in/on/at)' },
  { key: 'movement', label: 'Direção/uso' },
  { key: 'fixed', label: 'Expressões fixas' },
]

export const PREPOSITION_EXERCISES: GrammarExercise[] = [
  // Tempo
  { id: 'pp-t1', category: 'time', prompt: 'The meeting is ___ 3 pm.', hint: 'às 3h', answer: 'at',
    options: ['at', 'in', 'on'], note: 'Horas exatas usam “at”: at 3 pm, at noon, at midnight.' },
  { id: 'pp-t2', category: 'time', prompt: 'I was born ___ 1995.', hint: 'em 1995', answer: 'in',
    options: ['in', 'on', 'at'], note: 'Anos, meses e estações usam “in”: in 1995, in July, in winter.' },
  { id: 'pp-t3', category: 'time', prompt: 'We have class ___ Monday.', hint: 'na segunda', answer: 'on',
    options: ['on', 'in', 'at'], note: 'Dias da semana e datas usam “on”: on Monday, on July 5th.' },
  { id: 'pp-t4', category: 'time', prompt: 'She studies ___ the morning.', hint: 'de manhã', answer: 'in',
    options: ['in', 'on', 'at'], note: 'Períodos do dia: in the morning/afternoon/evening. Mas: at night.' },
  { id: 'pp-t5', category: 'time', prompt: 'The shop is closed ___ night.', hint: 'à noite', answer: 'at',
    options: ['at', 'in', 'on'], note: 'Exceção: “at night” (e at the weekend, no inglês britânico).' },

  // Lugar
  { id: 'pp-l1', category: 'place', prompt: 'The keys are ___ the table.', hint: 'sobre a mesa', answer: 'on',
    options: ['on', 'in', 'at'], note: 'Superfícies usam “on”: on the table, on the wall, on the floor.' },
  { id: 'pp-l2', category: 'place', prompt: 'She lives ___ Malta.', hint: 'em Malta', answer: 'in',
    options: ['in', 'on', 'at'], note: 'Cidades e países usam “in”: in Malta, in London, in Brazil.' },
  { id: 'pp-l3', category: 'place', prompt: "I'll meet you ___ the bus stop.", hint: 'no ponto', answer: 'at',
    options: ['at', 'in', 'on'], note: 'Pontos específicos usam “at”: at the bus stop, at the door, at home.' },
  { id: 'pp-l4', category: 'place', prompt: 'There is a picture ___ the wall.', hint: 'na parede', answer: 'on',
    options: ['on', 'in', 'at'], note: '“On the wall” — superfície vertical também é “on”.' },
  { id: 'pp-l5', category: 'place', prompt: 'The milk is ___ the fridge.', hint: 'dentro da geladeira', answer: 'in',
    options: ['in', 'on', 'at'], note: '“In” = dentro de um espaço fechado: in the fridge, in the box.' },

  // Direção / uso
  { id: 'pp-m1', category: 'movement', prompt: "I'm going ___ the gym.", hint: 'para a academia', answer: 'to',
    options: ['to', 'at', 'in'], note: 'Movimento/direção usa “to”: go to work, go to school.' },
  { id: 'pp-m2', category: 'movement', prompt: 'This gift is ___ you.', hint: 'para você', answer: 'for',
    options: ['for', 'to', 'of'], note: '“For” = destinado a alguém/algo: a gift for you, good for health.' },
  { id: 'pp-m3', category: 'movement', prompt: 'Cut the bread ___ a knife.', hint: 'com uma faca', answer: 'with',
    options: ['with', 'by', 'of'], note: 'Instrumento usa “with”: with a knife, with a pen.' },
  { id: 'pp-m4', category: 'movement', prompt: 'The book was written ___ her.', hint: 'por ela', answer: 'by',
    options: ['by', 'with', 'from'], note: 'Voz passiva (quem fez) usa “by”: written by her, made by hand.' },
  { id: 'pp-m5', category: 'movement', prompt: 'This juice is made ___ oranges.', hint: 'de laranjas', answer: 'from',
    options: ['from', 'of', 'by'], note: 'Matéria-prima transformada usa “from”: made from oranges.' },

  // Expressões fixas
  { id: 'pp-f1', category: 'fixed', prompt: "She's afraid ___ spiders.", hint: 'com medo de', answer: 'of',
    options: ['of', 'for', 'with'], note: 'Expressões fixas: afraid OF, proud of, full of.' },
  { id: 'pp-f2', category: 'fixed', prompt: "He's good ___ English.", hint: 'bom em', answer: 'at',
    options: ['at', 'in', 'on'], note: 'Habilidade usa “at”: good at English, bad at math.' },
  { id: 'pp-f3', category: 'fixed', prompt: 'We talked ___ the weather.', hint: 'sobre o tempo', answer: 'about',
    options: ['about', 'of', 'on'], note: 'Talk/think ABOUT: falar/pensar sobre algo.' },
  { id: 'pp-f4', category: 'fixed', prompt: 'Please wait ___ me.', hint: 'por mim', answer: 'for',
    options: ['for', 'to', 'on'], note: 'Wait FOR someone/something: esperar por.' },
  { id: 'pp-f5', category: 'fixed', prompt: 'It depends ___ you.', hint: 'de você', answer: 'on',
    options: ['on', 'of', 'to'], note: 'Depend ON: depender de. (nunca “depend of”).' },
  { id: 'pp-f6', category: 'fixed', prompt: 'Listen ___ me, please.', hint: 'me escute', answer: 'to',
    options: ['to', 'at', 'for'], note: 'Listen TO something/someone: escutar.' },
]
