// Estruturas-molde para formar frases em inglês (chunks)
// Baseado no método de frases prontas: você já tem vocabulário,
// estas estruturas dão o "encaixe" para produzir sem travar.
//
// Cada frame treina as 3 habilidades:
//  - LEITURA: ler os exemplos (en + pt)
//  - FALA: ler em voz alta (Web Speech API) — say it aloud
//  - ESCRITA: writingPrompt → o usuário monta a própria frase

export interface FrameExample {
  en: string;
  pt: string;
}

export interface SentenceFrame {
  id: string;
  frame: string;          // o molde, ex.: "I gotta ___"
  meaning: string;        // tradução do molde
  pattern: string;        // como preencher
  explanation: string;    // quando usar
  pronunciationTip?: string;
  examples: FrameExample[];   // leitura + fala (do simples ao com mais informação)
  writingPrompt: string;      // escrita: monte a sua
  level: "beginner" | "intermediate";
}

export const sentenceFrames: SentenceFrame[] = [
  {
    id: "i-gotta",
    frame: "I gotta ___",
    meaning: "eu tenho que / eu preciso",
    pattern: "I gotta + ação no presente (forma normal: go, eat, sleep, read...)",
    explanation:
      "Jeito casual e muito usado de dizer 'I have got to'. No dia a dia quase nunca se ouve a forma completa — ouve-se 'I gotta'.",
    pronunciationTip:
      "'gotta' soa como 'gára': o T entre vogais pega o som do R (igual em water, better, butter).",
    examples: [
      { en: "I gotta go.", pt: "Eu tenho que ir." },
      { en: "I gotta sleep.", pt: "Eu tenho que dormir." },
      { en: "I gotta sleep early.", pt: "Eu tenho que dormir cedo." },
      {
        en: "I gotta sleep early because I have a test tomorrow.",
        pt: "Eu tenho que dormir cedo porque tenho prova amanhã.",
      },
      { en: "I gotta read more books.", pt: "Eu tenho que ler mais livros." },
    ],
    writingPrompt:
      "Escreva 'I gotta' + uma ação no presente. Depois adicione um detalhe (quando? por quê?).",
    level: "beginner",
  },
  {
    id: "i-just",
    frame: "I just ___",
    meaning: "eu acabei de",
    pattern: "I just + ação no passado (said, ate, saw, thought, took...)",
    explanation: "Mostra que você fez algo há muito pouco tempo, recentemente.",
    examples: [
      { en: "I just said it.", pt: "Eu acabei de dizer isso." },
      { en: "I just ate.", pt: "Eu acabei de comer." },
      { en: "I just thought about you.", pt: "Eu acabei de pensar em você." },
      { en: "I just saw him.", pt: "Eu acabei de vê-lo." },
      { en: "I just took a shower.", pt: "Eu acabei de tomar banho." },
    ],
    writingPrompt: "Escreva 'I just' + uma ação no passado. Depois adicione um detalhe.",
    level: "beginner",
  },
  {
    id: "i-feel-like",
    frame: "I feel like ___",
    meaning: "estou a fim de",
    pattern:
      "I feel like + COISA (substantivo) OU + AÇÃO com -ing (pizza / eating pizza)",
    explanation:
      "Demonstra algo que você está querendo naquele momento. Atenção: coisa vai direto; ação precisa de -ing, porque ao falar SOBRE uma ação, ela leva -ing.",
    examples: [
      { en: "I feel like pizza.", pt: "Estou a fim de pizza." },
      { en: "I feel like a coffee.", pt: "Estou a fim de um café." },
      { en: "I feel like eating pizza.", pt: "Estou a fim de comer pizza." },
      { en: "I feel like sleeping.", pt: "Estou a fim de dormir." },
      { en: "I feel like going home.", pt: "Estou a fim de ir pra casa." },
    ],
    writingPrompt:
      "Escreva 'I feel like' + uma coisa. Depois escreva outra com 'I feel like' + ação com -ing.",
    level: "beginner",
  },
  {
    id: "how-about",
    frame: "How about ___?",
    meaning: "que tal",
    pattern: "How about + COISA OU + AÇÃO com -ing (a coffee / dancing)",
    explanation:
      "Para fazer sugestões, propor uma ideia ou pedir a opinião de alguém.",
    examples: [
      { en: "How about a coffee?", pt: "Que tal um café?" },
      { en: "How about next week?", pt: "Que tal semana que vem?" },
      { en: "How about pasta?", pt: "Que tal macarrão?" },
      { en: "How about watching a movie?", pt: "Que tal assistir um filme?" },
      { en: "How about going for a walk?", pt: "Que tal dar uma caminhada?" },
    ],
    writingPrompt:
      "Imagine que estão decidindo o jantar. Faça uma sugestão com 'How about' + comida. Depois sugira uma atividade com 'How about' + ação -ing.",
    level: "beginner",
  },
  {
    id: "it-must-have-been",
    frame: "It must have been ___",
    meaning: "deve ter sido",
    pattern: "It must have been + DESCRIÇÃO (good, hard, fun) OU + ALGUÉM (John)",
    explanation:
      "Para supor ou deduzir como algo foi, ou apontar quem pode ter feito algo.",
    pronunciationTip:
      "No dia a dia reduz para 'must've been'.",
    examples: [
      { en: "It must have been good.", pt: "Deve ter sido bom." },
      { en: "It must have been hard.", pt: "Deve ter sido difícil." },
      { en: "It must have been fun.", pt: "Deve ter sido divertido." },
      { en: "It must have been my boss.", pt: "Deve ter sido meu chefe." },
      { en: "It must have been love.", pt: "Deve ter sido amor." },
    ],
    writingPrompt:
      "Escreva 'It must have been' + uma descrição. Depois escreva outra apontando alguém.",
    level: "intermediate",
  },
  {
    id: "im-hooked-on",
    frame: "I'm hooked on ___",
    meaning: "estou viciado em (sentido leve)",
    pattern: "I'm hooked on + COISA OU + AÇÃO com -ing",
    explanation:
      "Você gosta tanto de algo que não consegue parar. Mais leve que 'addicted to', que soa mais formal ou ligado a drogas.",
    examples: [
      { en: "I'm hooked on this TV show.", pt: "Estou viciado nessa série." },
      { en: "I'm hooked on soccer.", pt: "Estou viciado em futebol." },
      { en: "I'm hooked on playing tennis.", pt: "Estou viciado em jogar tênis." },
      { en: "I'm hooked on learning English.", pt: "Estou viciado em aprender inglês." },
      { en: "I'm hooked on drawing.", pt: "Estou viciado em desenhar." },
    ],
    writingPrompt:
      "Escreva 'I'm hooked on' + uma coisa. Depois escreva outra com ação -ing.",
    level: "intermediate",
  },
  {
    id: "mind-if-i",
    frame: "Mind if I ___?",
    meaning: "se importa se eu",
    pattern: "Mind if I + ação no presente (open, close, sit, go, stay...)",
    explanation: "Jeito educado de pedir permissão para fazer algo.",
    pronunciationTip:
      "Soa como 'my-fi': o D de 'mind' cai ao juntar com a próxima palavra (mesmo fenômeno de 'and you' → 'an-you').",
    examples: [
      { en: "Mind if I sit here?", pt: "Se importa se eu sentar aqui?" },
      { en: "Mind if I open the window?", pt: "Se importa se eu abrir a janela?" },
      { en: "Mind if I go?", pt: "Se importa se eu ir?" },
      { en: "Mind if I sit next to you?", pt: "Se importa se eu sentar do seu lado?" },
      { en: "Mind if I sleep here tonight?", pt: "Se importa se eu dormir aqui hoje?" },
    ],
    writingPrompt:
      "Escreva 'Mind if I' + uma ação no presente. Depois adicione um detalhe (onde? quando?).",
    level: "intermediate",
  },
  {
    id: "i-kinda",
    frame: "I kinda ___",
    meaning: "eu meio que",
    pattern: "I kinda + ação no presente",
    explanation:
      "Você sente ou faz algo, mas não fortemente — 'um pouco', 'mais ou menos'.",
    examples: [
      { en: "I kinda play tennis.", pt: "Eu meio que jogo tênis." },
      { en: "I kinda cook.", pt: "Eu meio que cozinho." },
      { en: "I kinda speak German.", pt: "Eu meio que falo alemão." },
      { en: "I kinda like volleyball.", pt: "Eu meio que gosto de vôlei." },
      { en: "I kinda understand.", pt: "Eu meio que entendo." },
    ],
    writingPrompt:
      "Escreva 'I kinda' + uma ação que você não faz tão bem, mas meio que faz.",
    level: "beginner",
  },
];

// Regras de pronúncia que aparecem ao longo das estruturas — reutilizáveis
export const pronunciationRules = [
  {
    id: "t-between-vowels",
    rule: "T entre vogais pega o som do R (português)",
    examples: ["water → 'warer'", "better → 'bérer'", "butter → 'búrer'", "gotta → 'gára'"],
  },
  {
    id: "ed-endings",
    rule: "O -ed final só é pronunciado 'cheio' depois de T ou D; senão é suave",
    examples: ["wanted, needed, united → -ed pronunciado", "hooked, kissed → -ed suave"],
  },
  {
    id: "nd-drop",
    rule: "ND no fim de palavra: o D cai ao juntar com a próxima palavra",
    examples: ["mind if I → 'my-fi'", "and you → 'an-you'"],
  },
];

// Conceitos do método — úteis como dicas na interface
export const methodTips = [
  "Técnica do ponto: imagine um ponto a cada 2-3 palavras. Monte a frase em blocos, não tente montar tudo de uma vez — assim você não trava.",
  "Comece com estrutura + 1 palavra. Depois adicione um detalhe de cada vez.",
  "Fale em voz alta sempre. Você aprende a falar inglês falando.",
  "Você já sabe palavras. O que falta são as estruturas certas para usá-las.",
];
