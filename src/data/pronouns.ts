/**
 * Reforço de pronomes em inglês: sujeito, objeto, adjetivos possessivos,
 * pronomes possessivos e reflexivos. Cada exercício é uma frase com lacuna +
 * a forma certa, distratores plausíveis e uma explicação curta em PT.
 */

export type PronounCategory =
  | 'subject'
  | 'object'
  | 'possessive-adj'
  | 'possessive-pron'
  | 'reflexive'

export interface PronounCategoryInfo {
  key: PronounCategory
  label: string
  hint: string
}

export const PRONOUN_CATEGORIES: PronounCategoryInfo[] = [
  { key: 'subject', label: 'Sujeito', hint: 'quem faz a ação (vem antes do verbo)' },
  { key: 'object', label: 'Objeto', hint: 'quem recebe a ação (vem depois do verbo/preposição)' },
  { key: 'possessive-adj', label: 'Possessivo (adjetivo)', hint: 'vem ANTES do substantivo: my car' },
  { key: 'possessive-pron', label: 'Possessivo (pronome)', hint: 'fica sozinho, sem substantivo: it’s mine' },
  { key: 'reflexive', label: 'Reflexivo', hint: 'sujeito e objeto são a mesma pessoa: I did it myself' },
]

/** Tabela de referência (linha = pessoa). */
export interface PronounRow {
  person: string
  subject: string
  object: string
  possAdj: string
  possPron: string
  reflexive: string
}

export const PRONOUN_TABLE: PronounRow[] = [
  { person: 'eu',        subject: 'I',    object: 'me',   possAdj: 'my',    possPron: 'mine',   reflexive: 'myself' },
  { person: 'você',      subject: 'you',  object: 'you',  possAdj: 'your',  possPron: 'yours',  reflexive: 'yourself' },
  { person: 'ele',       subject: 'he',   object: 'him',  possAdj: 'his',   possPron: 'his',    reflexive: 'himself' },
  { person: 'ela',       subject: 'she',  object: 'her',  possAdj: 'her',   possPron: 'hers',   reflexive: 'herself' },
  { person: 'isso',      subject: 'it',   object: 'it',   possAdj: 'its',   possPron: '—',      reflexive: 'itself' },
  { person: 'nós',       subject: 'we',   object: 'us',   possAdj: 'our',   possPron: 'ours',   reflexive: 'ourselves' },
  { person: 'eles/elas', subject: 'they', object: 'them', possAdj: 'their', possPron: 'theirs', reflexive: 'themselves' },
]

export interface PronounExercise {
  id: string
  category: PronounCategory
  /** frase em inglês com a lacuna "___" */
  prompt: string
  /** dica em PT do que preencher */
  hint: string
  /** forma certa */
  answer: string
  /** alternativas (inclui a certa) */
  options: string[]
  /** explicação curta em PT */
  note: string
}

/** Monta o exemplo completo (frase com a resposta no lugar da lacuna). */
export function filledSentence(ex: PronounExercise): string {
  return ex.prompt.replace('___', ex.answer)
}

export const PRONOUN_EXERCISES: PronounExercise[] = [
  // ── Sujeito ───────────────────────────────────────────────
  { id: 'p-sub-1', category: 'subject', prompt: '___ am a teacher.', hint: 'eu', answer: 'I',
    options: ['I', 'Me', 'My'], note: 'Sujeito “I” (eu) faz a ação. “Me” é objeto e “my” é posse.' },
  { id: 'p-sub-2', category: 'subject', prompt: '___ is my brother.', hint: 'ele', answer: 'He',
    options: ['He', 'Him', 'His'], note: 'Sujeito “He” vem antes do verbo. Objeto seria “him”.' },
  { id: 'p-sub-3', category: 'subject', prompt: '___ is from Brazil.', hint: 'ela', answer: 'She',
    options: ['She', 'Her', 'Hers'], note: 'Sujeito “She”. “Her” é objeto/possessivo.' },
  { id: 'p-sub-4', category: 'subject', prompt: '___ are my friends.', hint: 'eles/elas', answer: 'They',
    options: ['They', 'Them', 'Their'], note: 'Sujeito plural “They”. “Them” é objeto, “their” é posse.' },
  { id: 'p-sub-5', category: 'subject', prompt: '___ work together every day.', hint: 'nós', answer: 'We',
    options: ['We', 'Us', 'Our'], note: 'Sujeito “We” (nós). Objeto seria “us”.' },
  { id: 'p-sub-6', category: 'subject', prompt: '___ is on the table.', hint: 'isso (o objeto)', answer: 'It',
    options: ['It', 'Its', 'He'], note: 'Para coisas/animais usamos “It”. “Its” é posse.' },

  // ── Objeto ────────────────────────────────────────────────
  { id: 'p-obj-1', category: 'object', prompt: 'Can you help ___?', hint: 'eu (me)', answer: 'me',
    options: ['me', 'I', 'my'], note: 'Depois do verbo usamos o objeto “me”, não “I”.' },
  { id: 'p-obj-2', category: 'object', prompt: 'I saw ___ at the party.', hint: 'ele (him)', answer: 'him',
    options: ['him', 'he', 'his'], note: 'Objeto “him” recebe a ação. Sujeito seria “he”.' },
  { id: 'p-obj-3', category: 'object', prompt: 'Please call ___ later.', hint: 'eles (them)', answer: 'them',
    options: ['them', 'they', 'their'], note: 'Objeto plural “them”. “They” é sujeito.' },
  { id: 'p-obj-4', category: 'object', prompt: 'He gave the keys to ___.', hint: 'nós (us)', answer: 'us',
    options: ['us', 'we', 'our'], note: 'Depois da preposição “to” usamos o objeto “us”.' },
  { id: 'p-obj-5', category: 'object', prompt: 'I really like ___.', hint: 'ela (her)', answer: 'her',
    options: ['her', 'she', 'hers'], note: 'Objeto “her”. Como sujeito seria “she”.' },

  // ── Possessivo adjetivo (antes do substantivo) ────────────
  { id: 'p-padj-1', category: 'possessive-adj', prompt: 'This is ___ car.', hint: 'meu', answer: 'my',
    options: ['my', 'mine', 'me'], note: 'Adjetivo possessivo vem ANTES do substantivo: my car.' },
  { id: 'p-padj-2', category: 'possessive-adj', prompt: "What's ___ name?", hint: 'seu', answer: 'your',
    options: ['your', 'yours', 'you'], note: '“Your” acompanha o substantivo (name). “Yours” fica sozinho.' },
  { id: 'p-padj-3', category: 'possessive-adj', prompt: 'She lost ___ keys.', hint: 'dela', answer: 'her',
    options: ['her', 'hers', 'she'], note: 'Antes do substantivo (keys) usamos “her”.' },
  { id: 'p-padj-4', category: 'possessive-adj', prompt: 'The dog wagged ___ tail.', hint: 'dele/dela (do cão)', answer: 'its',
    options: ['its', "it's", 'his'], note: '“Its” = posse. Cuidado: “it’s” = it is.' },
  { id: 'p-padj-5', category: 'possessive-adj', prompt: 'They sold ___ house.', hint: 'deles', answer: 'their',
    options: ['their', 'theirs', 'them'], note: '“Their” vem antes do substantivo (house).' },
  { id: 'p-padj-6', category: 'possessive-adj', prompt: 'We painted ___ room blue.', hint: 'nosso', answer: 'our',
    options: ['our', 'ours', 'us'], note: '“Our” acompanha o substantivo (room).' },

  // ── Possessivo pronome (sozinho) ──────────────────────────
  { id: 'p-ppron-1', category: 'possessive-pron', prompt: 'This book is ___.', hint: 'meu', answer: 'mine',
    options: ['mine', 'my', 'me'], note: 'Sem substantivo depois, usamos “mine”: It’s mine.' },
  { id: 'p-ppron-2', category: 'possessive-pron', prompt: 'Is this pen ___?', hint: 'seu', answer: 'yours',
    options: ['yours', 'your', 'you'], note: '“Yours” fica sozinho. “Your” precisaria de um substantivo.' },
  { id: 'p-ppron-3', category: 'possessive-pron', prompt: 'The red car is ___.', hint: 'dela', answer: 'hers',
    options: ['hers', 'her', 'she'], note: '“Hers” fica sozinho; “her” viria antes de um substantivo.' },
  { id: 'p-ppron-4', category: 'possessive-pron', prompt: 'These seats are ___.', hint: 'nossos', answer: 'ours',
    options: ['ours', 'our', 'us'], note: '“Ours” sozinho. “Our” precisa de substantivo.' },

  // ── Reflexivo ─────────────────────────────────────────────
  { id: 'p-ref-1', category: 'reflexive', prompt: 'I taught ___ English.', hint: 'eu mesma', answer: 'myself',
    options: ['myself', 'me', 'my'], note: 'Reflexivo quando sujeito e objeto são a mesma pessoa: I taught myself.' },
  { id: 'p-ref-2', category: 'reflexive', prompt: 'She hurt ___ while running.', hint: 'ela mesma', answer: 'herself',
    options: ['herself', 'her', 'hers'], note: '“Herself” = ela machucou a si mesma.' },
  { id: 'p-ref-3', category: 'reflexive', prompt: 'Be careful or you’ll hurt ___.', hint: 'você mesma', answer: 'yourself',
    options: ['yourself', 'you', 'your'], note: '“Yourself” fecha a ação no próprio sujeito.' },
  { id: 'p-ref-4', category: 'reflexive', prompt: 'The kids can dress ___.', hint: 'eles mesmos', answer: 'themselves',
    options: ['themselves', 'them', 'their'], note: 'Plural reflexivo “themselves” (eles mesmos).' },
]
