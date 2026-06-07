import type { CategoryKey, Difficulty } from '@/types'

export interface ConversationScenario {
  id: string
  title: string
  emoji: string
  category: CategoryKey
  difficulty: Difficulty
  /** descrição curta mostrada no card */
  description: string
  /** contexto enviado à IA para guiar o papel dela */
  context: string
  /** primeira fala da IA para abrir a conversa */
  opener: string
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'airport-malta',
    title: 'Chegada no aeroporto',
    emoji: '🛬',
    category: 'viagem',
    difficulty: 'beginner',
    description: 'Você acabou de chegar em Malta e precisa se virar no aeroporto.',
    context:
      'You are an immigration officer and then a taxi driver at Malta International Airport. The user just arrived from Brazil to study English. Ask about purpose of stay, accommodation, and help with directions.',
    opener: "Welcome to Malta! May I see your passport, please? What brings you here?",
  },
  {
    id: 'finding-flat',
    title: 'Procurando acomodação',
    emoji: '🏠',
    category: 'intercambio',
    difficulty: 'intermediate',
    description: 'Negociar um quarto/apartamento com um anfitrião.',
    context:
      'You are a landlord in Sliema, Malta showing a room to rent. Discuss price, bills, contract length, and house rules with the user.',
    opener: "Hi! So you're interested in the room? Let me tell you a bit about it. What would you like to know first?",
  },
  {
    id: 'first-day-school',
    title: 'Primeiro dia na escola',
    emoji: '🎓',
    category: 'academico',
    difficulty: 'beginner',
    description: 'Se apresentar e tirar dúvidas no primeiro dia de aula.',
    context:
      'You are a friendly receptionist at an English language school in Malta on the user\'s first day. Help with schedule, class level, and facilities.',
    opener: "Good morning and welcome! Is this your first day with us? Let's get you sorted. What's your name?",
  },
  {
    id: 'restaurant',
    title: 'Pedindo no restaurante',
    emoji: '🍽️',
    category: 'cotidiano',
    difficulty: 'beginner',
    description: 'Fazer um pedido, perguntar do cardápio e pagar a conta.',
    context:
      'You are a waiter at a seaside restaurant in Malta. Take the user\'s order, make recommendations, and handle the bill.',
    opener: "Good evening! Welcome. Here's the menu. Can I get you something to drink while you decide?",
  },
  {
    id: 'making-friends',
    title: 'Fazendo amizade',
    emoji: '🤝',
    category: 'social',
    difficulty: 'intermediate',
    description: 'Puxar conversa com um colega de classe e marcar de sair.',
    context:
      'You are a classmate from Italy at the language school. Make small talk, find common interests, and suggest hanging out.',
    opener: "Hey! You're in my class, right? I'm Marco, from Italy. Where are you from?",
  },
  {
    id: 'business-call',
    title: 'Call de negócios',
    emoji: '💼',
    category: 'negocios',
    difficulty: 'advanced',
    description: 'Participar de uma reunião rápida em inglês profissional.',
    context:
      'You are a colleague on a remote work call. Discuss a project status, deadlines, and next steps in professional English.',
    opener: "Hi, thanks for joining. Before we start, could you give us a quick update on where things stand?",
  },
]
