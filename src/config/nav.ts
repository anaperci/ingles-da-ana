import {
  Home,
  Brain,
  Repeat,
  MessagesSquare,
  Mic,
  MonitorPlay,
  PenLine,
  Blocks,
  AudioLines,
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
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/vocabulario', label: 'Vocabulário', icon: Brain },
  { to: '/verbos', label: 'Verbos', icon: Repeat },
  { to: '/verbos-som', label: 'Verbos · Som', icon: AudioLines },
  { to: '/escrita', label: 'Escrita', icon: PenLine },
  { to: '/estruturas', label: 'Estruturas', icon: Blocks },
  { to: '/conversacao', label: 'Conversação', icon: MessagesSquare },
  { to: '/pronuncia', label: 'Pronúncia', icon: Mic },
  { to: '/videos', label: 'Vídeos', icon: MonitorPlay },
]
