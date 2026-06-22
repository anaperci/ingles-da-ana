/**
 * Mapeia a atividade do dia do planner para os módulos do próprio app.
 * Em vez de mandar a Ana pra ferramentas externas (Speak Aloud, Fluêncio, etc.),
 * abrimos o módulo equivalente aqui dentro.
 */
import {
  Mic,
  MessagesSquare,
  PenLine,
  MonitorPlay,
  Brain,
  Repeat,
  type LucideIcon,
} from 'lucide-react'

export interface AppLink {
  to: string
  label: string
  icon: LucideIcon
}

// Ordem = prioridade de exibição (pronúncia primeiro).
const RULES: { re: RegExp; link: AppLink }[] = [
  {
    re: /speak aloud|pron[úu]ncia|em voz alta|repita|leia.*voz|dramatiz/i,
    link: { to: '/pronuncia', label: 'Pronúncia', icon: Mic },
  },
  {
    re: /flu[êe]ncio|chatbot|conversa|prompt|di[áa]logo|encena/i,
    link: { to: '/conversacao', label: 'Conversar', icon: MessagesSquare },
  },
  {
    re: /escreva|escrever|texto|frases|carta|e-?mail|resumo|reverso|collins|biografia/i,
    link: { to: '/escrita', label: 'Escrever', icon: PenLine },
  },
  {
    re: /youtube|v[íi]deo|canal|tedtalk|s[ée]rie|filme|tutorial|assista|trecho|escut|ou[çc]a|podcast|[áa]udio|r[áa]dio|m[úu]sica/i,
    link: { to: '/videos', label: 'Vídeo', icon: MonitorPlay },
  },
  {
    re: /vocabul[áa]rio|dicion[áa]rio|palavras|flashcard|word/i,
    link: { to: '/vocabulario', label: 'Vocabulário', icon: Brain },
  },
  {
    re: /\bverbo|phrasal/i,
    link: { to: '/verbos', label: 'Verbos', icon: Repeat },
  },
]

/** Módulos do app relevantes para a atividade (até 3, sem repetir). */
export function appLinksForActivity(activity: string): AppLink[] {
  const out: AppLink[] = []
  const seen = new Set<string>()
  for (const r of RULES) {
    if (r.re.test(activity) && !seen.has(r.link.to)) {
      seen.add(r.link.to)
      out.push(r.link)
    }
  }
  return out.slice(0, 3)
}
