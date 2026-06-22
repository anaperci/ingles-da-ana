/**
 * Decks de flashcards temáticos, alinhados aos temas que o planner do curso
 * percorre ao longo das semanas. Vocabulário essencial por tópico, para estudo
 * rápido (virar a carta, ouvir, próxima).
 */

export interface DeckWord {
  en: string
  pt: string
  example: string
}

export interface ThemedDeck {
  key: string
  label: string
  emoji: string
  words: DeckWord[]
}

export const THEMED_DECKS: ThemedDeck[] = [
  {
    key: 'introductions',
    label: 'Apresentações',
    emoji: '👋',
    words: [
      { en: 'name', pt: 'nome', example: 'My name is Ana.' },
      { en: 'nice to meet you', pt: 'prazer em conhecer', example: 'Nice to meet you!' },
      { en: 'where are you from?', pt: 'de onde você é?', example: 'Where are you from?' },
      { en: "I'm from", pt: 'eu sou de', example: "I'm from Brazil." },
      { en: 'to live', pt: 'morar', example: 'I live in Lisbon.' },
      { en: 'to work', pt: 'trabalhar', example: 'I work as a designer.' },
      { en: 'age', pt: 'idade', example: 'What is your age?' },
      { en: 'hobby', pt: 'passatempo', example: 'My hobby is reading.' },
      { en: 'friend', pt: 'amigo(a)', example: 'She is my friend.' },
      { en: 'to introduce', pt: 'apresentar', example: 'Let me introduce myself.' },
    ],
  },
  {
    key: 'food',
    label: 'Comida',
    emoji: '🍽️',
    words: [
      { en: 'breakfast', pt: 'café da manhã', example: 'I have breakfast at 7.' },
      { en: 'lunch', pt: 'almoço', example: 'Lunch is ready.' },
      { en: 'dinner', pt: 'jantar', example: 'We had dinner together.' },
      { en: 'meal', pt: 'refeição', example: 'It was a great meal.' },
      { en: 'recipe', pt: 'receita', example: 'This is my favorite recipe.' },
      { en: 'ingredient', pt: 'ingrediente', example: 'Add the next ingredient.' },
      { en: 'to cook', pt: 'cozinhar', example: 'I love to cook.' },
      { en: 'tasty', pt: 'saboroso', example: 'The soup is tasty.' },
      { en: 'spicy', pt: 'apimentado', example: 'This food is too spicy.' },
      { en: 'to order', pt: 'pedir (no restaurante)', example: "Let's order a pizza." },
    ],
  },
  {
    key: 'house',
    label: 'Casa',
    emoji: '🏠',
    words: [
      { en: 'kitchen', pt: 'cozinha', example: 'She is in the kitchen.' },
      { en: 'bedroom', pt: 'quarto', example: 'My bedroom is small.' },
      { en: 'bathroom', pt: 'banheiro', example: 'Where is the bathroom?' },
      { en: 'living room', pt: 'sala de estar', example: 'We watch TV in the living room.' },
      { en: 'furniture', pt: 'móveis', example: 'The furniture is new.' },
      { en: 'to clean', pt: 'limpar', example: 'I clean the house on Sundays.' },
      { en: 'key', pt: 'chave', example: 'I lost my keys.' },
      { en: 'door', pt: 'porta', example: 'Close the door, please.' },
      { en: 'window', pt: 'janela', example: 'Open the window.' },
      { en: 'wall', pt: 'parede', example: 'The picture is on the wall.' },
    ],
  },
  {
    key: 'shopping',
    label: 'Compras',
    emoji: '🛒',
    words: [
      { en: 'shop', pt: 'loja', example: 'This shop is expensive.' },
      { en: 'to buy', pt: 'comprar', example: 'I want to buy a coat.' },
      { en: 'price', pt: 'preço', example: 'What is the price?' },
      { en: 'cheap', pt: 'barato', example: 'It is very cheap.' },
      { en: 'expensive', pt: 'caro', example: 'That car is expensive.' },
      { en: 'size', pt: 'tamanho', example: 'Do you have my size?' },
      { en: 'to pay', pt: 'pagar', example: 'I will pay by card.' },
      { en: 'cash', pt: 'dinheiro (espécie)', example: 'Can I pay in cash?' },
      { en: 'discount', pt: 'desconto', example: 'Is there a discount?' },
      { en: 'receipt', pt: 'recibo / nota', example: 'Here is your receipt.' },
    ],
  },
  {
    key: 'family',
    label: 'Família',
    emoji: '👨‍👩‍👧',
    words: [
      { en: 'mother', pt: 'mãe', example: 'My mother is a nurse.' },
      { en: 'father', pt: 'pai', example: 'His father works abroad.' },
      { en: 'sister', pt: 'irmã', example: 'I have one sister.' },
      { en: 'brother', pt: 'irmão', example: 'My brother is older.' },
      { en: 'son', pt: 'filho', example: 'Their son is five.' },
      { en: 'daughter', pt: 'filha', example: 'She has a daughter.' },
      { en: 'parents', pt: 'pais', example: 'My parents live nearby.' },
      { en: 'husband', pt: 'marido', example: 'Her husband is kind.' },
      { en: 'wife', pt: 'esposa', example: 'His wife is a teacher.' },
      { en: 'relative', pt: 'parente', example: 'We visit our relatives.' },
    ],
  },
  {
    key: 'travel',
    label: 'Viagem',
    emoji: '✈️',
    words: [
      { en: 'trip', pt: 'viagem', example: 'Have a nice trip!' },
      { en: 'airport', pt: 'aeroporto', example: 'We met at the airport.' },
      { en: 'flight', pt: 'voo', example: 'My flight is delayed.' },
      { en: 'luggage', pt: 'bagagem', example: 'Where is my luggage?' },
      { en: 'ticket', pt: 'passagem / bilhete', example: 'I bought a ticket.' },
      { en: 'hotel', pt: 'hotel', example: 'The hotel is downtown.' },
      { en: 'to book', pt: 'reservar', example: 'I booked a room.' },
      { en: 'abroad', pt: 'no exterior', example: 'She studies abroad.' },
      { en: 'passport', pt: 'passaporte', example: 'Do not forget your passport.' },
      { en: 'to land', pt: 'aterrissar', example: 'The plane landed on time.' },
    ],
  },
  {
    key: 'work',
    label: 'Trabalho',
    emoji: '💼',
    words: [
      { en: 'job', pt: 'emprego', example: 'I have a new job.' },
      { en: 'meeting', pt: 'reunião', example: 'The meeting is at 3.' },
      { en: 'boss', pt: 'chefe', example: 'My boss is on vacation.' },
      { en: 'colleague', pt: 'colega', example: 'She is my colleague.' },
      { en: 'deadline', pt: 'prazo', example: 'The deadline is Friday.' },
      { en: 'salary', pt: 'salário', example: 'He got a higher salary.' },
      { en: 'office', pt: 'escritório', example: 'I am at the office.' },
      { en: 'to hire', pt: 'contratar', example: 'They hired two people.' },
      { en: 'skill', pt: 'habilidade', example: 'Communication is a key skill.' },
      { en: 'task', pt: 'tarefa', example: 'I finished the task.' },
    ],
  },
  {
    key: 'health',
    label: 'Saúde e corpo',
    emoji: '🩺',
    words: [
      { en: 'head', pt: 'cabeça', example: 'My head hurts.' },
      { en: 'hand', pt: 'mão', example: 'Raise your hand.' },
      { en: 'to feel', pt: 'sentir', example: 'I feel tired.' },
      { en: 'sick', pt: 'doente', example: 'She is sick today.' },
      { en: 'pain', pt: 'dor', example: 'I have a pain in my back.' },
      { en: 'doctor', pt: 'médico', example: 'I need to see a doctor.' },
      { en: 'medicine', pt: 'remédio', example: 'Take this medicine.' },
      { en: 'healthy', pt: 'saudável', example: 'Eat healthy food.' },
      { en: 'to rest', pt: 'descansar', example: 'You should rest.' },
      { en: 'to breathe', pt: 'respirar', example: 'Breathe slowly.' },
    ],
  },
  {
    key: 'clothes',
    label: 'Roupas',
    emoji: '👕',
    words: [
      { en: 'shirt', pt: 'camisa', example: 'He is wearing a blue shirt.' },
      { en: 'shoes', pt: 'sapatos', example: 'These shoes are new.' },
      { en: 'dress', pt: 'vestido', example: 'She bought a red dress.' },
      { en: 'coat', pt: 'casaco', example: "Take your coat, it's cold." },
      { en: 'to wear', pt: 'vestir / usar', example: 'I wear glasses.' },
      { en: 'jacket', pt: 'jaqueta', example: 'Where is my jacket?' },
      { en: 'pants', pt: 'calça', example: 'These pants are too long.' },
      { en: 'hat', pt: 'chapéu', example: 'Nice hat!' },
      { en: 'to fit', pt: 'servir (tamanho)', example: 'This shirt fits me well.' },
      { en: 'clothes', pt: 'roupas', example: 'I need new clothes.' },
    ],
  },
  {
    key: 'routine',
    label: 'Rotina',
    emoji: '⏰',
    words: [
      { en: 'to wake up', pt: 'acordar', example: 'I wake up early.' },
      { en: 'to get up', pt: 'levantar-se', example: 'I get up at six.' },
      { en: 'to brush', pt: 'escovar', example: 'I brush my teeth.' },
      { en: 'to commute', pt: 'deslocar-se (trabalho)', example: 'I commute by bus.' },
      { en: 'busy', pt: 'ocupado', example: 'I am busy today.' },
      { en: 'to relax', pt: 'relaxar', example: 'I relax in the evening.' },
      { en: 'to go to bed', pt: 'ir dormir', example: 'I go to bed at eleven.' },
      { en: 'always', pt: 'sempre', example: 'I always drink coffee.' },
      { en: 'usually', pt: 'geralmente', example: 'I usually walk to work.' },
      { en: 'early', pt: 'cedo', example: 'She arrived early.' },
    ],
  },
  {
    key: 'feelings',
    label: 'Sentimentos',
    emoji: '😊',
    words: [
      { en: 'happy', pt: 'feliz', example: 'I am so happy today.' },
      { en: 'sad', pt: 'triste', example: 'Why are you sad?' },
      { en: 'tired', pt: 'cansado', example: 'I am really tired.' },
      { en: 'angry', pt: 'bravo / com raiva', example: 'Do not be angry.' },
      { en: 'excited', pt: 'animado', example: 'I am excited about the trip.' },
      { en: 'nervous', pt: 'nervoso', example: 'She felt nervous.' },
      { en: 'bored', pt: 'entediado', example: 'I am bored.' },
      { en: 'proud', pt: 'orgulhoso', example: 'I am proud of you.' },
      { en: 'scared', pt: 'assustado', example: 'The kid was scared.' },
      { en: 'to worry', pt: 'preocupar-se', example: 'Do not worry.' },
    ],
  },
  {
    key: 'nature',
    label: 'Natureza e clima',
    emoji: '🌦️',
    words: [
      { en: 'weather', pt: 'tempo (clima)', example: "How's the weather?" },
      { en: 'rain', pt: 'chuva', example: 'It is going to rain.' },
      { en: 'sunny', pt: 'ensolarado', example: 'It is a sunny day.' },
      { en: 'cold', pt: 'frio', example: 'It is cold outside.' },
      { en: 'hot', pt: 'quente', example: 'It is very hot today.' },
      { en: 'wind', pt: 'vento', example: 'The wind is strong.' },
      { en: 'tree', pt: 'árvore', example: 'There is a big tree.' },
      { en: 'beach', pt: 'praia', example: "Let's go to the beach." },
      { en: 'mountain', pt: 'montanha', example: 'We climbed the mountain.' },
      { en: 'river', pt: 'rio', example: 'The river is clean.' },
    ],
  },
]

export const DECK_BY_KEY: Record<string, ThemedDeck> = Object.fromEntries(
  THEMED_DECKS.map((d) => [d.key, d])
)
