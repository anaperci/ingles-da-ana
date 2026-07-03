import {
  Home,
  Brain,
  BookText,
  MessagesSquare,
  Mic,
  MonitorPlay,
  PenLine,
  Blocks,
  AudioLines,
  NotebookPen,
  CalendarRange,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** módulo correspondente, quando aplicável */
  end?: boolean
}

/**
 * Fonte única da navegação superior. Para adicionar um módulo novo
 * (ex.: Verbos), basta incluir um item aqui.
 */
export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/planner', label: 'Planner', icon: CalendarRange },
  { to: '/vocabulario', label: 'Vocabulary', icon: Brain },
  { to: '/gramatica', label: 'Grammar', icon: BookText },
  { to: '/verbos-som', label: 'Verb sounds', icon: AudioLines },
  { to: '/escrita', label: 'Writing', icon: PenLine },
  { to: '/notes', label: 'Notes', icon: NotebookPen },
  { to: '/estruturas', label: 'Sentence frames', icon: Blocks },
  { to: '/conversacao', label: 'Conversation', icon: MessagesSquare },
  { to: '/pronuncia', label: 'Pronunciation', icon: Mic },
  { to: '/videos', label: 'Videos', icon: MonitorPlay },
]
