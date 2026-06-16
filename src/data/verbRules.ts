// Regras de pronúncia que aparecem repetidamente nos verbos irregulares.
// Exibir como dica contextual quando o verbo pertencer ao grupo.

export interface PronunciationRule {
  id: string;
  title: string;
  explanation: string;
  examples: string[]; // verbos do arquivo irregularVerbs.ts que seguem essa regra
}

export const verbPronunciationRules: PronunciationRule[] = [
  {
    id: "i-curto-e",
    title: "I curto = Ê (não 'í')",
    explanation:
      "Em palavras curtas de uma sílaba, o I tem som de Ê fechado, não de 'í' longo. Brasileiro tende a abrir demais. Coloque os lábios quase fechados e diga um 'ê' rápido.",
    examples: ["begin", "give", "sit", "drink", "win", "think", "bring"],
  },
  {
    id: "e-magico",
    title: "E mágico — o E final some",
    explanation:
      "Quando uma palavra termina em E, esse E não é pronunciado. Ele 'estica' a vogal anterior para um som longo e some. Ex.: leave → o EA vira 'í' longo; drive → o I vira 'ai'. O E mágico é silencioso, mas muda tudo.",
    examples: ["leave", "drive", "write", "come", "like", "ride", "lose", "break"],
  },
  {
    id: "ew-u",
    title: "EW = U (som de 'iú' ou 'ú')",
    explanation:
      "A combinação EW tem som de 'iú' ou 'ú', nunca 'eu'. Pense em 'new' = 'niú', 'few' = 'fiú'. Nos verbos: 'grew' = 'grú', 'threw' = 'trú', 'knew' = 'niú', 'flew' = 'flú'.",
    examples: ["grow", "throw", "know"],
  },
  {
    id: "ough-ot",
    title: "OUGH = 'ót' (em think/bring/buy)",
    explanation:
      "A combinação OUGH em verbos no passado vira 'ót'. Não tem nada de intuitivo — só memorizar o padrão: thought = 'tót', brought = 'bróit', bought = 'bót'. São três verbos que seguem exatamente o mesmo padrão de terminação.",
    examples: ["think", "bring"],
  },
  {
    id: "l-mudo",
    title: "L mudo em walk e talk",
    explanation:
      "Nas palavras 'walk' e 'talk', o L não é pronunciado. 'Walk' soa como 'uók', 'talk' como 'tók'. Muita gente fala 'uálk' ou 'tálk' e não é assim que nativo fala. O L simplesmente desaparece.",
    examples: ["walk", "talk"],
  },
  {
    id: "k-mudo",
    title: "K mudo antes de N",
    explanation:
      "Quando K aparece antes de N no início da palavra, o K é mudo. 'Know' = 'nó', 'knee' = 'ní', 'knife' = 'náif', 'knock' = 'nók'. No 'knew' = 'niú'. Nunca pronuncie o K nesses casos.",
    examples: ["know"],
  },
  {
    id: "all-ol",
    title: "ALL = 'ól' (não 'al')",
    explanation:
      "A combinação ALL tem som de 'ól', com O fechado e L audível. 'Call' = 'kól', 'fall' = 'fól', 'tall' = 'tól'. Brasileiro tende a abrir e dizer 'kál' ou 'fál' — não é assim. Pense em 'ól' bem fechado.",
    examples: ["call", "fall"],
  },
  {
    id: "ed-regra",
    title: "O -ED no passado tem 3 pronúncias",
    explanation:
      "O sufixo -ED não é sempre 'ed'. Regra: (1) Após consoante SURDA (p, k, t, ch, sh, f, s): vira T — 'looked' = 'lukt', 'helped' = 'hêlpt'. (2) Após consoante SONORA ou vogal: vira D — 'called' = 'kóld'. (3) Após T ou D: aí sim vira 'êd' — 'wanted' = 'uóntêd'. Nos verbos irregulares a maioria não tem -ED; essa regra é para os regulares.",
    examples: ["look", "help", "ask", "like", "walk", "talk", "call"],
  },
  {
    id: "a-sorridente",
    title: "A sorridente = æ",
    explanation:
      "Em algumas palavras, o A tem um som aberto que parece um A e um E ao mesmo tempo — como se você estivesse sorrindo na hora de falar. Linguistas chamam de 'æ'. Exemplos: 'have', 'ask', 'sat', 'drank', 'scratch'. Para treinar: diga 'A' e abra bem os cantos da boca.",
    examples: ["have", "ask", "sit", "drink", "scratch"],
  },
  {
    id: "ea-armadilha",
    title: "EA nem sempre é 'í' longo — atenção!",
    explanation:
      "A combinação EA pode ter sons diferentes: na maioria = 'í' longo (eat, feel, deal, hear, sleep). Mas: 'break' = 'éi' (como steak). E 'read' no passado vira 'rêd' (E curto). Não existe regra única — cada verbo com EA vale prestar atenção individualmente.",
    examples: ["eat", "deal", "hear", "break", "read"],
  },
  {
    id: "said-armadilha",
    title: "said = 'sêd' (não 'séid')",
    explanation:
      "'Said' é a maior cilada dos verbos regulares de alta frequência. Quem conhece 'say' tende a dizer 'séid' no passado — errado. 'Said' é 'sêd', com E curto, como 'bed' ou 'red'. O mesmo padrão de pronúncia surpresa de 'read' (presente 'ríid' → passado 'rêd').",
    examples: ["say", "read"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Dicas de método — exibir como encorajamento ou dicas fixas na interface
// ─────────────────────────────────────────────────────────────────────────────

export interface MethodTip {
  id: string;
  title: string;
  body: string;
}

export const verbMethodTips: MethodTip[] = [
  {
    id: "par-nao-lista",
    title: "Aprenda o par, não a lista",
    body: "Não tente memorizar 50 verbos de uma vez. Escolha um par (presente → passado), escreva, fale em voz alta, use em uma frase. Depois passe para o próximo. Um par bem fixado vale mais que dez decorados sem entender.",
  },
  {
    id: "vire-a-frase",
    title: "Vire a frase — não só o verbo",
    body: "Saber que 'go' vira 'went' é decoreba. Saber dizer 'I go to the gym' e virar para 'I went to the gym' é usar. O exercício de virar a frase treina o verbo no contexto real, que é onde ele vai aparecer quando você estiver falando.",
  },
  {
    id: "fale-em-voz-alta",
    title: "Fale em voz alta — sempre",
    body: "Você não aprende a falar lendo em silêncio. Leia o par em voz alta. Leia as frases de exemplo em voz alta. Fale sozinha no quarto, no banheiro, caminhando. O inglês que fica é o inglês que saiu pela sua boca.",
  },
  {
    id: "pontos-de-acesso",
    title: "Crie pontos de acesso",
    body: "Um 'ponto de acesso' é quando você encontra o mesmo verbo em contextos diferentes: na estrutura-molde ('I can't help thinking'), no vocabulário, numa série que você assiste. Cada vez que você tropeça naquele verbo em outro contexto, ele se fixa mais. Não estude em isolamento — conecte.",
  },
  {
    id: "bebe-no-ingles",
    title: "Você ainda é 'bebê' no inglês — e tá ótimo",
    body: "Bebê não fala perfeito, mas pratica sem vergonha. Pronúncia errada, conjugação errada, pausa no meio da frase — faz parte. Nativo nenhum vai rir de você. A fluência vem da repetição, não do talento. Continue praticando.",
  },
  {
    id: "padrao-antes-excecao",
    title: "Aprenda o padrão antes da exceção",
    body: "Quando uma regra de pronúncia aparecer (EW = U, L mudo, E mágico), olhe outros verbos que seguem o mesmo padrão. Fixar o padrão é mais poderoso do que memorizar cada palavra individualmente. O inglês tem lógica — ela só não é óbvia no começo.",
  },
];
