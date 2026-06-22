/**
 * Metadados leves do planner (sem o texto das atividades). Permite calcular
 * progresso na Home sem puxar o arquivo grande de dados (`planner.ts`).
 */
export const PLANNER_TOTAL_DAYS = 360
export const PLANNER_DAYS_PER_WEEK = 7

/** Número da semana (1..52) de um dia global (1..360). */
export function weekOf(day: number): number {
  return Math.ceil(day / PLANNER_DAYS_PER_WEEK)
}
