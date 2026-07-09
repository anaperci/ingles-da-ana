import {
  Home,
  Brain,
  BookText,
  Dumbbell,
  Repeat,
  Link2,
  Zap,
  Users,
  MessagesSquare,
  Mic,
  MonitorPlay,
  PenLine,
  Blocks,
  NotebookPen,
  CalendarRange,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** casa exata da rota (usado no Home) */
  end?: boolean
  /** sub-itens: quando presente, o item vira um menu expansível */
  children?: NavItem[]
}

/**
 * Fonte única da navegação superior. Para adicionar um módulo novo
 * basta incluir um item aqui. Itens com `children` viram submenu.
 */
export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/planner', label: 'Planner', icon: CalendarRange },
  { to: '/notes', label: 'Notes', icon: NotebookPen },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  {
    to: '/training',
    label: 'Training',
    icon: GraduationCap,
    children: [
      { to: '/escrita', label: 'Writing', icon: PenLine },
      { to: '/conversacao', label: 'Conversation', icon: MessagesSquare },
      { to: '/pronuncia', label: 'Pronunciation', icon: Mic },
    ],
  },
  {
    to: '/gramatica',
    label: 'Grammar',
    icon: BookText,
    children: [
      { to: '/verbos', label: 'Verbs', icon: Repeat },
      { to: '/preposicoes', label: 'Prepositions', icon: Link2 },
      { to: '/adverbios', label: 'Adverbs', icon: Zap },
      { to: '/pronomes', label: 'Pronouns', icon: Users },
      { to: '/gramatica-real', label: 'Real grammar', icon: Sparkles },
    ],
  },
  { to: '/vocabulario', label: 'Vocabulary', icon: Brain },
  { to: '/estruturas', label: 'Sentence frames', icon: Blocks },
  { to: '/videos', label: 'Videos', icon: MonitorPlay },
]
