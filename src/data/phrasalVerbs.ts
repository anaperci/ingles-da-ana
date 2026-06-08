import type { PhrasalVerb } from '@/types/verbs'

/**
 * Phrasal verbs agrupados por VERBO BASE (get up, get over, get along juntos).
 * Arquivo separado para expandir depois.
 */
export const PHRASAL_VERBS: PhrasalVerb[] = [
  // get
  {
    id: 'pv-get-up', kind: 'phrasal', baseVerb: 'get', particle: 'up', phrasal: 'get up',
    meaning: 'to rise from bed', translation: 'levantar (da cama)',
    example: 'I get up at 7 every morning.', exampleTranslation: 'Eu levanto às 7 toda manhã.', level: 'A1',
  },
  {
    id: 'pv-get-over', kind: 'phrasal', baseVerb: 'get', particle: 'over', phrasal: 'get over',
    meaning: 'to recover from something', translation: 'superar/recuperar-se',
    example: 'It took me a week to get over the flu.', exampleTranslation: 'Levei uma semana para me recuperar da gripe.', level: 'B1',
  },
  {
    id: 'pv-get-along', kind: 'phrasal', baseVerb: 'get', particle: 'along', phrasal: 'get along',
    meaning: 'to have a good relationship', translation: 'dar-se bem',
    example: 'I get along with my roommates.', exampleTranslation: 'Eu me dou bem com meus colegas de quarto.', level: 'B1',
  },
  {
    id: 'pv-get-by', kind: 'phrasal', baseVerb: 'get', particle: 'by', phrasal: 'get by',
    meaning: 'to manage with what you have', translation: 'virar-se/sobreviver',
    example: 'I can get by with my basic English.', exampleTranslation: 'Consigo me virar com meu inglês básico.', level: 'B2',
  },

  // take
  {
    id: 'pv-take-off', kind: 'phrasal', baseVerb: 'take', particle: 'off', phrasal: 'take off',
    meaning: 'to leave the ground (plane)', translation: 'decolar',
    example: 'The plane takes off at noon.', exampleTranslation: 'O avião decola ao meio-dia.', level: 'A2',
  },
  {
    id: 'pv-take-after', kind: 'phrasal', baseVerb: 'take', particle: 'after', phrasal: 'take after',
    meaning: 'to resemble a family member', translation: 'puxar a/parecer com',
    example: 'She takes after her mother.', exampleTranslation: 'Ela puxou a mãe.', level: 'B1',
  },
  {
    id: 'pv-take-up', kind: 'phrasal', baseVerb: 'take', particle: 'up', phrasal: 'take up',
    meaning: 'to start a new hobby', translation: 'começar (hobby)',
    example: 'I took up painting last year.', exampleTranslation: 'Comecei a pintar ano passado.', level: 'B1',
  },

  // look
  {
    id: 'pv-look-up', kind: 'phrasal', baseVerb: 'look', particle: 'up', phrasal: 'look up',
    meaning: 'to search for information', translation: 'procurar/consultar',
    example: 'Look up the word in the dictionary.', exampleTranslation: 'Procure a palavra no dicionário.', level: 'A2',
  },
  {
    id: 'pv-look-after', kind: 'phrasal', baseVerb: 'look', particle: 'after', phrasal: 'look after',
    meaning: 'to take care of', translation: 'cuidar de',
    example: 'Can you look after my dog this weekend?', exampleTranslation: 'Você pode cuidar do meu cachorro neste fim de semana?', level: 'A2',
  },
  {
    id: 'pv-look-forward', kind: 'phrasal', baseVerb: 'look', particle: 'forward to', phrasal: 'look forward to',
    meaning: 'to be excited about something future', translation: 'estar ansioso por',
    example: 'I look forward to meeting you.', exampleTranslation: 'Estou ansiosa para te conhecer.', level: 'B1',
  },
]
